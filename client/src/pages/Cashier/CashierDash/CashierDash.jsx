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
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleOrderToggle = (order) => {
    setSelectedOrder((prevOrder) => (prevOrder === order ? null : order));
  };

  const handleRedirect = () => {
    setIsDialogOpen(false);
    if (paymentMethod === "cash") {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order !== selectedOrder)
      );
      setSelectedOrder(null);
    } else {
      window.location.href = "/fonepay";
    }
  };
  // Function to handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // Function to handle payment method change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Function to calculate total price
  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    for (const item of order.cart) {
      totalPrice += item.quantity* item.price;
    }
    return totalPrice;
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
                    <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                      <option value="">Choose a payment method</option>
                      <option value="cash">Cash</option>
                      <option value="fonepay">Fonepay</option>
                    </select>
                  </div>
                  <Button className="CashCancel" onClick={handleDialogClose}>Cancel</Button>
                  <Button className="CashSave" onClick={handleRedirect}>Continue</Button>
                </TableContainer>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashierDash;
