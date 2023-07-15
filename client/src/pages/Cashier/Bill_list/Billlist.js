import React, { useEffect, useState } from "react";
import "./Billlist.css";
import { FaPrint } from "react-icons/fa";
import io from "socket.io-client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";

const Billlist = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showBillList, setShowBillList] = useState(false);

  const handleShowBillList = () => {
    setShowBillList(true);
  };

  const handleHideBillList = () => {
    setShowBillList(false);
  };

  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    for (const item of order.cart) {
      totalPrice += item.amount * item.price;
    }
    return totalPrice;
  };

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("newOrder", (order) => {
      console.log("Received new order:", order);
      setOrders((prevOrders) => [order, ...prevOrders]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const storedOrders = localStorage.getItem("cashierOrders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cashierOrders", JSON.stringify(orders));
  }, [orders]);

  const handleRedirect = (order) => {
    setSelectedOrder(order); // Set the selected order
    setShowInvoice(true); // Show invoice popup
  };

  const printInvoice = () => {
    const invoiceElement = document.getElementById("invoice"); // Get the invoice element by its ID
    if (invoiceElement) {
      const printWindow = window.open("", "_blank"); // Open a new window for printing
      printWindow.document.write(invoiceElement.innerHTML); // Write the invoice content to the new window
      printWindow.document.close();
      printWindow.print(); // Print the new window
      printWindow.close(); // Close the new window after printing
      setShowInvoice(false); // Hide the invoice popup
    
     
    }
  };

  return (
    <div>
      <div className="title-icon mb-5 mt-5 dflex">
        <h3>Bill List</h3>
      </div>

      <div className="BillDetails">
        <TableContainer component={Paper}>
          <Table className="bill-tab">
            <TableHead>
              <TableRow className="orderrow">
                <TableCell>Order Code</TableCell>
                <TableCell>Table Number</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment method</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.code}>
                  <TableCell>{order.code}</TableCell>
                  <TableCell>{order.tableNumber}</TableCell>
                  <TableCell>{calculateTotalPrice(order)}</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="left">
                    <span className="status">pending</span>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      className="bg-success"
                      style={{ border: "none" }}
                      onClick={() => handleRedirect(order)} // Pass the order to handleRedirect
                    >
                      <FaPrint />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Invoice Popup */}
      {showInvoice && (
        <div className="InvoicePopup">
          <div className="InvoiceDetails">
            <button
              className="CloseButton"
              onClick={() => setShowInvoice(false)}
            >
              X
            </button>
            <div id="invoice">
              <p className="foodie">Foodie</p>
              {selectedOrder && (
                <>
                  <p className="bill-details">
                    Order Code: {selectedOrder.code}
                  </p>
                  <p className="bill-details">
                    Table Number: {selectedOrder.tableNumber}
                  </p>
                  <p className="bill-details">Payment method: </p>
                  <div className="billborder"></div>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>SN</TableCell>
                          <TableCell>Ordered item</TableCell>
                          <TableCell align="left">Quantity</TableCell>
                          <TableCell align="left">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.cart.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell> {/* Add SN */}
                            <TableCell>{item.title}</TableCell>
                            <TableCell align="left">{item.amount}</TableCell>
                            <TableCell align="left">{item.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="billborder"></div>
                  <p className="InvoiceTotal">
                    Total Price:
                    <span> Rs. {calculateTotalPrice(selectedOrder)}</span>
                  </p>
                </>
              )}
            </div>
            <Button className="PrintButton" onClick={printInvoice}>
              Print
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billlist;
