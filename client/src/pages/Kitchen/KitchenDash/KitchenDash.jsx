import React, { useEffect, useState } from "react";
import "./KitchenDash.css";
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

const KitchenDash = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [clickedDone, setClickedDone] = useState(false);

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

  const handleTableButtonClick = (order) => {
    setSelectedOrder((prevOrder) => (prevOrder === order ? null : order));
  };

  const handleOrderDone = (orderCode, itemId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.code === orderCode) {
          const updatedCart = order.cart.filter((item) => item.id !== itemId);
          if (updatedCart.length === 0) {
            return null; // Remove the order from the list
          }
          return { ...order, cart: updatedCart };
        }
        return order;
      }).filter(Boolean) // Filter out null orders
    );
  };

  const remainingOrders = orders.filter((order) => order.cart.length > 0);
  const allOrdersDone = remainingOrders.length === 0;

  return (
    <div className="MainDash">
      <div className="title-icon mb-5 mt-5 dflex">
        <h1>Kitchen Dashboard</h1>
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
              className={`table-button ${
                selectedOrder === order ? "selected" : ""
              }`}
              onClick={() => handleTableButtonClick(order)}
            >
              Table {order.tableNumber}
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
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
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
                            {item.title}
                          </TableCell>
                          <TableCell align="left">{item.amount}</TableCell>
                          <TableCell align="left">
                            <span className="status">pending</span>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="bg-success"
                              style={{ border: "none" }}
                              onClick={() =>
                                handleOrderDone(order.code, item.id)
                              }
                            >
                              Done
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        ))}
        {allOrdersDone && (
          <div className="no-orders">No orders remaining.</div>
        )}
      </div>
    </div>
  );
};

export default KitchenDash;
