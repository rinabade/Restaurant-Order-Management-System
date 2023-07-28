import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../Table.css'
import { useState, useEffect } from "react";
import { getPaymentDetail } from "../../../api/userAction";

const makeStyle=(status)=>{
  if(status === 'complete')
  {
    return {
      background: 'rgb(145 254 159 / 30%)',
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
  const [data, setData] = useState([])
  useEffect(() =>{
    getPaymentDetail()
    .then((response) => {
      setData(response.data.data)
    })
  },[])
  return (
      <div className="Table">
      <h3>Payments</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell align="left">Table no.</TableCell>
                <TableCell align="left">Payment mode</TableCell>
                <TableCell align="left">Transaction code</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {data.map((dataItem,index) => (
                <TableRow
                  key={dataItem.payment_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell className="border">{index + 1}</TableCell>
                  <TableCell align="left">{dataItem.table_number}</TableCell>
                  <TableCell align="left">{dataItem.payment_method}</TableCell>
                  <TableCell align="left">{dataItem.transactionCode}</TableCell>
                  <TableCell align="left">{dataItem.createdAt}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(dataItem.payment_status)}>{dataItem.payment_status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
 }
