import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Table.css";
import { useState, useEffect } from "react";
import { getAllOrderDetails } from "../../../api/userAction";


export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllOrderDetails().then(
      (success) => {
        if (success.data) {
          console.log(success.data.data);
          // console.log(success.data.data.map(user => user.lastname));
          setData(success.data.data);
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          //Backend Error message
          console.log(error.response);
        } else {
          //Server Not working Error
          console.log("Server not working");
        }
      }
    );
  }, []);


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const npage = Math.ceil(data.length / pageSize);
  const pages = [...Array(npage + 1).keys()].slice(1);
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const records = data.slice(firstIndex, lastIndex);

  const prevPageHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="Table">
      <h3>Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No. </TableCell>
              <TableCell align="left">Table Number</TableCell>
              <TableCell align="left">Item Name</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {records.map((dataItem, cart_id) => (
              <TableRow key={cart_id}>
                <TableCell component="th" scope="row">
                  {dataItem.orderdetails_id}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {dataItem.table_number}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {dataItem.item_name}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {dataItem.quantity}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {dataItem.price}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>

      <p style={{ display: "flex" }}>
          <span style={{ border: "none", color: "blue", height: "25px" }} onClick={prevPageHandler}>Prev |</span>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? "active" : ""}`}
            >
              {`${page} | `}
            </span>
          ))}
          <span style={{ border: "none", color: "blue", height: "25px" }} onClick={nextPageHandler}>Next</span>
        </p>
    </div>
  );
}
