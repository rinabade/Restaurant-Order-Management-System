import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../Table.css'
import { Button } from "react-bootstrap";


function createData(name, ID, Category, Price, Action) {
  return { name, ID, Category, Price, Action };
}

const rows = [
  createData("Veg", 18908424, "momo", "200"),
  createData("Chicken", 18908424, "momo", "200"),
 
];


export default function BasicTable() {
  return (
      <div className="Table ">
      <h3 className="mb-5">Roles</h3>
         
         <form>
         <div className='mb-5'>
          
            {/* <label htmlFor="name"><strong>Roles</strong></label> */}
           <div className="d-flex">
                <input type="name" placeholder='Enter Role' name='name'
                  className="form-control rounded-0 w-50" required/>
                 
              
       <button type='submit' className='add btn text-white rounded-12 bg-primary'>Add</button> 

       <button type='submit' className='delete btn text-white rounded-12 bg-danger '>Cancel</button> 
      </div>
             
            </div>
         </form>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          className="tablecon ml-5"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="left">Role ID</TableCell>
                <TableCell align="left">Roles</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.ID}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left" >
                    <Button className=" bg-success" style={{border:"none"}}>Edit</Button> 
                    <Button style={{ marginLeft: "10px", backgroundColor: "#CD5C5C", border:"none"}}>Delete</Button> 
                    </TableCell>
                  
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}