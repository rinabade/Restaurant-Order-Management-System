import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../Table.css'

function createData(name, ID, Category, Price, Action) {
  return { name, ID, Category, Price, Action };
}

const rows = [
  createData("Veg", 18908424, "1", "200"),
  createData("Chicken", 18908424, "2", "200"),
  createData("buff", 18908424, "3", "200"),
  createData("buff", 18908421, "4", "200"),
];


export default function BasicTable() {
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
                {/* <TableCell align="left">Price</TableCell> */}
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row,index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell className="border">{index + 1}</TableCell>
                  <TableCell align="left">{row.ID}</TableCell>
                  <TableCell align="left">{row.Category}</TableCell>
                  {/* <TableCell align="left">
                    <span className="status">{row.Price}</span>
                  </TableCell> */}
                  <TableCell align="left" className="Details">Delete</TableCell>
                  <TableCell align="left" className="Details">2023/17/7</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}