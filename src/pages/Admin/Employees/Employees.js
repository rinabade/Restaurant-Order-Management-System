import * as React from "react";
import Table from "@mui/material/Table";
import { useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import '../Table.css'

function createData(Firstname,Lastname,Email,Password,Address,Phone,Gender, Jobtitle,Date,Salary,Status,Action ) {
  return { Firstname, Lastname,  Email,Password, Address, Phone, Gender, Jobtitle,Date,Salary,Status,Action };
}

const rows = [
  createData("Ram","stha","example@gmail.com","fsghshsdc","baneshwor", "9818035087","male","cashier","2020/02/22","1000","Full-time"),
]


export default function BasicTable() {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/admin/AdminRegister");
  };

  return (
      <div className="Table">
      <h3>Employees</h3>
      <div className="registerbtn mb-5 mt-5">
      <Button variant="contained" color="primary" onClick={handleRegisterClick}>Register Employee</Button>
      </div>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell align="left" >LastName</TableCell> 
                <TableCell align="left" >Email</TableCell>
                <TableCell align="left" >Password</TableCell>
                <TableCell align="left" >Address</TableCell>
                <TableCell align="left" >Phone</TableCell>
                <TableCell align="left" >Gender</TableCell>
                <TableCell align="left" >Job Title</TableCell>
                <TableCell align="left" >Date of hire</TableCell>
                <TableCell align="left" >Salary</TableCell>
                <TableCell align="left" >Status</TableCell>
                <TableCell align="left" >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                >
                  <TableCell component="th" scope="row">
                    {row.Firstname}
                  </TableCell>
                  <TableCell align="left" className="table-cell">{row.Lastname}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Email}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Password}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Address}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Phone}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Gender}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Jobtitle}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Date}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Salary}</TableCell>
                  <TableCell align="left" className="table-cell" >{row.Status}</TableCell>
                  <TableCell align="left" className="Details">
                  <Button className=" bg-success" style={{border:"none",color:"white",height:"25px"}}>Edit</Button> 
                    <Button style={{ marginTop: "5px", backgroundColor: "#CD5C5C", border:"none", color:"white",height:"25px"}}>Delete</Button> 
                </TableCell>
            
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
