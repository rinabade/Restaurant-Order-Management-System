import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "./CashierOrder.css";
import {
  createMenu,
  deleteMenu,
  editMenu,
  getAllMenu,
} from "../../../api/userAction";

function createData(OrderItems ,Quantity) {
  return {  OrderItems ,Quantity };
}

const rows = [
  createData("Veg momo", 2),
  createData("Chicken momo", 1),
  
];

export default function CashierOrder() {
  const [selectedTable, setSelectedTable] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle button click
  const handleTableButtonClick = (tableNumber) => {
    setSelectedTable(tableNumber);
    setIsDialogOpen(true);
  };

  // Function to handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      {/* Buttons for each table */}
      <Button className="CashButton" onClick={() => handleTableButtonClick(1)}>Table 1</Button>
      <Button className="CashButton" onClick={() => handleTableButtonClick(2)}>Table 2</Button>
      <Button className="CashButton" onClick={() => handleTableButtonClick(3)}>Table 3</Button>

      {/* Pop-up dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Table {selectedTable}</DialogTitle>
        <DialogContent>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order Items</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.OrderItems}
                  </TableCell>
                  <TableCell align="left">{row.Quantity}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
