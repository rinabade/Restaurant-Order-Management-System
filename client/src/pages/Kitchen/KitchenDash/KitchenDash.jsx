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
import { DeleteOrder, updateOrderStatus } from "../../../api/userAction";


const KitchenDash = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [clickedDone, setClickedDone] = useState(false);

  useEffect(() => {
    const socket = io("http://202.52.248.120:8000");

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

  const handleOrderDone = (orderCode, itemId, table_number) => {
    updateOrderStatus(itemId, table_number)
      .then((response) => {
        // Handle success response if needed
        console.log('Order status updated:', response.data);
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.code === orderCode) {
              const updatedCart = order.cart.map((item) => {
                if (item.menu_id === itemId) {
                  return { ...item, status: 'done' };
                }
                return item;
              });
              return { ...order, cart: updatedCart };
            }
            return order;
          })
        );
      })
      .catch((error) => {
        // Handle error response if needed
        console.error('Error updating order status:', error);
      });
  };
  const handleOrderCancel = (orderCode, itemId, table_number) => {
    DeleteOrder(itemId)
      .then((response) => {
        // Handle success response if needed
        console.log('Order deleted:', response.data);
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.code === orderCode) {
              const updatedCart = order.cart.filter((item) => item.menu_id !== itemId);
              if (updatedCart.length === 0) {
                return null; // Remove the order from the list
              }
              return { ...order, cart: updatedCart };
            }
            return order;
          }).filter(Boolean) // Filter out null orders
        );
      })
      .catch((error) => {
        // Handle error response if needed
        console.error('Error updating order status:', error);
      });
  };
  
  const socket = io("http://202.52.248.120:8000");
  const handleallDone = (tableNumber,orderCode, itemId,table_number) => {
    // Find the specific table order
    const order = orders.find((order) => order.table_number[0] === tableNumber);
  
    if (!order) {
      console.error(`Order for table ${tableNumber} not found.`);
      return;
    }
  
    // Update the order status for all items in the cart to 'done'
    const updatedCart = order.cart.map((item) => {
      return { ...item, status: 'done' };
    });
  
    // Emit the "orderDoneNotification" event for this table
    const socket = io("http://202.52.248.120:8000");
    socket.emit("orderDoneNotification", {
      tableNumber: order.table_number[0],
      cart: updatedCart,
    });
  
    // Remove the order from the orders array
    // updateOrderStatus(itemId, table_number)
    //   .then((response) => {
    //     // Handle success response if needed
    //     console.log('Order status updated:', response.data);
    //     setOrders((prevOrders) =>
    //       prevOrders.map((order) => {
    //         if (order.code === orderCode) {
    //           const updatedCart = order.cart.filter((item) => item.menu_id !== itemId);
    //           if (updatedCart.length === 0) {
    //             return null; // Remove the order from the list
    //           }
    //           return { ...order, cart: updatedCart };
    //         }
    //         return order;
    //       }).filter(Boolean) // Filter out null orders
    //     );
    //   })
    //   .catch((error) => {
    //     // Handle error response if needed
    //     console.error('Error updating order status:', error);
    //   });
    DeleteOrder(order.code)
      .then((response) => {
       
        console.log('Order status updated:', response.data);
        setOrders((prevOrders) => prevOrders.filter((order) => order.table_number[0] !== tableNumber));
      })
      .catch((error) => {
      
        console.error('Error updating order status:', error);
      });
  };
  

  console.log("Orders in KitchenDash:", orders);

  // ...

  

  


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
      <h3 className="cashrecent">Recent Orders</h3>

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
              Table {order.table_number[0]}
            </Button>
            {selectedOrder === order && (
              <div className="order-details">
               
                  <Button
                      className="alldonebtn bg-success"
                      style={{ border: "none" }}                            
                      onClick={() => handleallDone( order.table_number[0])}
                  >
                       Done 
                  </Button>
                <TableContainer
                  component={Paper}
                  className="cashtableorder"

                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="kitchenorderrow">
                        <TableCell  className="border">Ordered item</TableCell>
                        <TableCell align="left"  className="border">Quantity</TableCell>
                        <TableCell align="left"  className="border">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                      {order.cart.map((item) => (
                        <TableRow
                          key={item.menu_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row"  className="border">
                            {item.item_name}
                          </TableCell>
                          <TableCell align="left"  className="border">{item.quantity}</TableCell>
                          <TableCell align="left"  className="border">
                            <Button
                              className="bg-success"
                              style={{ border: "none" }}
                              onClick={() =>
                                handleOrderDone(order.code, item.menu_id, order.table_number[0])
                              }
                            >
                              Confirm
                            </Button>
                            {item.status !== 'done' && (
                              <Button
                                className="kitcancel bg-danger"
                                style={{ border: "none" }}
                                onClick={() =>
                                  handleOrderCancel(order.code, item.menu_id, order.table_number[0])
                                }
                              >
                                Cancel
                              </Button>
                            )}
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
