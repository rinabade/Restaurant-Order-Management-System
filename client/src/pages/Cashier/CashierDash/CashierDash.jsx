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
import QRCode from "react-qr-code"; // Import QRCode component
import { createPayment } from "../../../api/userAction";
import Qr from "../../../imgs/Qr.JPG";
import esewalogo from "../../../imgs/esewa-logo.png";

const CashierDash = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [transactionCode, setTransactionCode] = useState(""); // New state for transaction code input field

  useEffect(() => {
    const socket = io("http://202.52.248.120:8000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("neworderDoneNotification", (order) => {
      console.log("Received order done notification:", order);
      setOrders((prevOrders) => [order, ...prevOrders]);
      // Find the order in the state and update its cart
      // setOrders((prevOrders) =>
      //   prevOrders.map((prevOrder) =>
      //     prevOrder.code === order.code ? { ...prevOrder, cart: order.cart } : prevOrder
      //   )
      // );
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
  };

  const handleRedirect = (table_number, paymentMethod, transactionCode, totalPrice) => {
    setIsDialogOpen(true);
    if (paymentMethod === "cash") {
      setShowInvoice(true);
      
    } else if (paymentMethod === "fonepay") {
      setShowInvoice(true);
    }
    
    createPayment({table_number, paymentMethod, transactionCode, totalPrice})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);

    if (selectedMethod === "fonepay") {
      setShowQRCode(true);
    } else {
      setShowQRCode(false);
    }
  };

  const handleTransactionCodeChange = (event) => {
    setTransactionCode(event.target.value);
  };

  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    for (const item of order.cart) {
      totalPrice += item.quantity* item.price;
    }
    return totalPrice;
  };

  const printInvoice = () => {    
    const invoiceElement = document.getElementById("invoice");
    if (invoiceElement) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(invoiceElement.innerHTML);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
      setShowInvoice(false);
      const updatedOrders = orders.filter((order) => order !== selectedOrder);
      setOrders(updatedOrders);
      setSelectedOrder(null);
      localStorage.setItem("cashierOrders", JSON.stringify(updatedOrders));
      window.location.href = '/Cashier/Cashierdash';
    }
  };

    const generateUniqueCode = (table_number) => {
      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      const tableNumber = table_number; // Replace with the actual table number
  
      const uniqueCode = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}${currentTime}${tableNumber}`;

      const limitedCode = uniqueCode.substring(0, 8)
      console.log(limitedCode); // Output the unique code to the console (optional)
      return limitedCode
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

      <h3>Recent Orders</h3>

      <div className="order-table">
        {orders.map((order) => (
          <div key={order.code}>
            <Button
              variant="secondary"
              className="cashiertable-button"
              onClick={() => handleOrderToggle(order)}
            >
              Table {order.tableNumber}
            </Button>
            {selectedOrder === order && (
              <div className="order-details">
                {/* <h4>Order Code: {order.code}</h4> */}
                <TableContainer
                className="cashtableorder"
                  component={Paper}
                  
                >
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    className="cash-table"
                  >
                    <TableHead>
                      <TableRow className="cashorderrow">
                        <TableCell className="border">SN</TableCell>
                        <TableCell className="border">Ordered item</TableCell>
                        <TableCell align="left" className="border">Quantity</TableCell>
                        <TableCell align="left" className="border">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                      {order.cart.map((item, index) => (
                        <TableRow
                          key={item.menu_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell className="border">{index + 1}</TableCell>
                          <TableCell component="th" scope="row" className="border">
                            {item.item_name}
                          </TableCell>
                          <TableCell align="left" className="border">
                            {item.quantity}
                          </TableCell>
                          <TableCell align="left" className="border">
                            {item.price}
                          </TableCell>
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

                  {/* transition code */}
                  {paymentMethod === "fonepay" && (
                    <div className="TransactionCodeContainer">
                      <span>Transaction Code:</span>
                      <input
                        type="text"
                        value={transactionCode}
                        onChange={handleTransactionCodeChange}
                      />
                    </div>
                  )}
                  <Button className="CashCancel" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button className="CashSave" onClick={() => handleRedirect( order.tableNumber, paymentMethod, transactionCode, calculateTotalPrice(selectedOrder))}>
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
          <div className="InvoiceDetails">
            <button
              className="CloseButton"
              onClick={() => setShowInvoice(false)}
            >
              X
            </button>
            <div id="invoice">
              <p className="foodie">Resturant Management System</p>
              {selectedOrder && (
                <>
                  <p className="bill-details">Invoice Number: {generateUniqueCode(selectedOrder.tableNumber)}</p>
                  <p className="bill-details">Table Number: {selectedOrder.tableNumber}</p>
                  <p className="bill-details">Payment method: {paymentMethod}</p>
                  {paymentMethod === "fonepay" && (
                    <p className="bill-details">Transaction Code: {transactionCode}</p>
                  )}
                  <div className="billborder"></div>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className="border">SN</TableCell>
                          <TableCell className="border">Ordered item</TableCell>
                          <TableCell align="left" className="border">
                            Quantity
                          </TableCell>
                          <TableCell align="left" className="border">
                            Price
                          </TableCell>
                        </TableRow>
                        <TableRow></TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.cart.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell className="border">{index + 1}</TableCell>
                            <TableCell className="border">{item.item_name}</TableCell>
                            <TableCell align="left" className="border">
                              {item.quantity}
                            </TableCell>
                            <TableCell align="left" className="border">
                              {item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="billborder"></div>
                  <p className="InvoiceTotal">
                    Total Price:<span> Rs. {calculateTotalPrice(selectedOrder)}</span>
                  </p>
                </>
              )}
            </div>
            <br></br>
            <Button className="Printbtn" onClick={() => printInvoice()}>
              Print
            </Button>
          </div>
        </div>
      )}

      {/* QR Code Popup */}
      {showQRCode && (
        <div className="QRCodePopup">
          <div className="QRCodeDetails">
            <button className="QrCloseButton" onClick={() => setShowQRCode(false)}>
              X
            </button>
            <div className="Qr">
            <img src={esewalogo} className="Qr-image" alt="" />
            </div>
             <p className="QRCodeDescription">Restaurant Management System</p>
             <br></br>
            <div className="Qr">
            <img src={Qr} className="Qr-image" alt="" />
            </div>
           <br></br>
            <p className="QRCodeDescription">Scan QR Code to make payment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierDash;
