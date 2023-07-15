import React, { useEffect, useState } from "react";
import "./CashierDash.css";
import { FaBell } from "react-icons/fa";
import io from "socket.io-client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";

const CashierDash = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInvoice, setShowInvoice] = useState(false); // New state for controlling invoice popup visibility

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

  const handleOrderToggle = (order) => {
    setSelectedOrder((prevOrder) => (prevOrder === order ? null : order));
    // console.log("selectedOrder-------", selectedOrder);
  };

  const handleRedirect = () => {
    setIsDialogOpen(false);
    if (paymentMethod === "cash") {
      setShowInvoice(true); // Show invoice popup
    } else {
      window.location.href = "/fonepay";
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    for (const item of order.cart) {
      totalPrice += item.quantity* item.price;
    }
    return totalPrice;
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
      setOrders((prevOrders) =>
      prevOrders.filter((order) => order !== selectedOrder)
    );
    setSelectedOrder(null);
    localStorage.setItem(
      "cashierOrders",
      JSON.stringify(orders.filter((order) => order !== selectedOrder))
    );
    }
  };

  return (
    <div className="MainDash">
      <div className="title-icon mb-5 mt-5 dflex">
        <h1>Cashier Dashboard</h1>
        <div className="bell-icons">
          <div className="bell-icon">
            <FaBell style={{ fontSize: "50px" }} />
            <span>{orders.length}</span>
          </div>
        </div>
      </div>
      <h3>Recent Payments</h3>

      <div className="order-table">
        {orders.map((order) => (
          <div key={order.code}>
            <Button
              variant="secondary"
              className="table-button"
              onClick={() => handleOrderToggle(order)}
            >
              Table {order.table_number[0]}
            </Button>
            {selectedOrder === order && (
              <div className="order-details">
                <h4>Order Code: {order.code}</h4>
                <TableContainer
                  component={Paper}
                  style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Ordered item</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="left">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                      {order.cart.map((item) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.item_name}
                          </TableCell>
                          <TableCell align="left">{item.quantity}</TableCell>
                          <TableCell align="left">{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <br></br>
                  <p className="CashierOrderTotal">
                    <span>Total Price: </span>
                    <span>Rs. {calculateTotalPrice(order)}</span>
                  </p>

                  <div className="PaymentMethodContainer">
                    <span>Select Payment Method:</span>
                    <select
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      <option value="">Choose a payment method</option>
                      <option value="cash">Cash</option>
                      <option value="fonepay">Fonepay</option>
                    </select>
                  </div>
                  <Button className="CashCancel" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button className="CashSave" onClick={handleRedirect}>
                    Continue
                  </Button>
                </TableContainer>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Invoice Popup */}
      {showInvoice && (
        <div className="InvoicePopup">
          
          <div className="InvoiceDetails"  > 
          <button className="CloseButton" onClick={() => setShowInvoice(false)}>
                X
              </button>
              <div id="invoice">
            {/* <h2>Foodie</h2> */}
           
            <h3>Payment Details</h3>
            {selectedOrder && (
              <>
              <br></br>
                {/* <p>Order Code: {selectedOrder.code}</p> */}
                <p>Table Number: {selectedOrder.table_number[0]}</p>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ordered item</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="left">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.item_name}</TableCell>
                          <TableCell align="left">{item.quantity}</TableCell>
                          <TableCell align="left">{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
                <p className="InvoiceTotal">
                  Total Price: Rs. {calculateTotalPrice(selectedOrder)}
                </p>
              </>
            )} 
            </div>
            <br></br>
            <Button className="PrintButton" onClick={printInvoice}>
            Print
          </Button>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default CashierDash;
