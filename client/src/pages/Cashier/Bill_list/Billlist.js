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
import { getPaymentDetail } from "../../../api/userAction";

const Billlist = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  // console.log("data----------", data)

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
      console.log("New order received:", order);
      setOrders((prevOrders) => [...prevOrders, order]);
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

  useEffect(() =>{
    getPaymentDetail()
    .then((response) => {
      // console.log(response.data);
      setData(response.data.data)
    })
  },[])

  return (
    <div>
      <div className="title-icon mb-5 mt-5 dflex">
        <h3>Payment List</h3>
      </div>

      <div className="BillDetails">
        <TableContainer component={Paper}>
          <Table className="bill-tab">
            <TableHead>
              <TableRow className="orderrow">
              <TableCell className="border">SN</TableCell>
                {/* <TableCell className="border">Order Code</TableCell> */}
                <TableCell className="border">Table Number</TableCell>
                <TableCell className="border">Payment method</TableCell>
                {/* <TableCell className="border">Total Price</TableCell> */}
                <TableCell className="border">Payment Date</TableCell>
                <TableCell align="left" className="border">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dataItem,index) => (
                <TableRow key={dataItem.payment_id} className="border">
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell className="border">{order.code}</TableCell> */}
                  <TableCell className="border">{dataItem.table_number}</TableCell>
                  <TableCell className="border">{dataItem.payment_method}</TableCell>
                  {/* <TableCell className="border">
                    {calculateTotalPrice(order)}
                  </TableCell> */}
                  <TableCell className="border">{dataItem.createdAt}</TableCell>
                  <TableCell align="left" className="border">
                    <span className="status">Complete</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Billlist;
