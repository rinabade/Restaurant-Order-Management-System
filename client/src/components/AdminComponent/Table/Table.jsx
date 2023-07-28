import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { getFeedback, getOrders } from "../../../api/userAction";

const makeStyle=(status)=>{
  if(status === 'complete')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
}

export default function BasicTable() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    getOrders()
    .then((response)=>{
      if (response.data){
        console.log(response.data)
        setData(response.data.data)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

  useEffect(() => {
    getFeedback().then((response)=>{
      if (response.data){
        console.log(response.data)
        setValues(response.data.data)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }, []);

  return (
    <div className="Table">
      <h3>Recent Orders</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        className="table-admin"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="admin-recents">
                <TableCell>Table_Number</TableCell>
                <TableCell align="left">Item Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {data.map((dataItem) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {dataItem.table_number}
                  </TableCell>
                  <TableCell align="left">{dataItem.item_name}</TableCell>
                  <TableCell align="left">{dataItem.quantity}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(dataItem.status)}>{dataItem.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <br></br>
                <br></br>
        <h3>Recent Feedbacks</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          className="table-admin"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow  className="admin-recents">
                <TableCell>S.No.</TableCell>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Email Address</TableCell>
                <TableCell align="left">Feedbacks</TableCell>
                {/* <TableCell align="left"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {values.map((dataItem, feedback_id) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {dataItem.feedback_id}
                  </TableCell>
                  <TableCell align="left">{dataItem.fullname}</TableCell>
                  <TableCell align="left">{dataItem.email}</TableCell>
                  <TableCell align="left">{dataItem.message} </TableCell>
                  {/* <TableCell align="left" className="Details">Details</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
