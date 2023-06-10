import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../Table.css'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "react-bootstrap";
import { createPermission, deletePermission, getAllPermission } from "../../../api/userAction";
import { useEffect } from "react";


 function AdminPermission() {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);

  const [values, setValues] = useState({
    permission_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createPermission(values)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        // Optionally, perform additional actions after successful post
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        // Optionally, display an error message to the user
      });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPermission().then(
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


  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleEditClick = (row) => {
    setEditItemId(row);
    setConfirmEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation
    if (deleteItemId) {
      deletePermission(deleteItemId)
        .then((response) => {
          console.log("Permission deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.permission_id !== deleteItemId)
          );
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log("An error occurred while deleting the user");
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        });
    }
  };

  const handleConfirmEdit = () => {
    // Perform the edit operation
    if (editItemId) {
      // Add your edit logic here
      console.log("Edit item with ID:", editItemId);

const rows = [
  createData("Veg", 18908424, "momo", "200"),
  createData("Chicken", 18908424, "momo", "200"),
 
];

  const handleCancelEdit = () => {
    setEditItemId(null);
    setConfirmEditDialogOpen(false);
  };

export default function BasicTable() {
  return (
    <div className="Table ">
      <h3 className="mb-5">Permissions</h3>
         
         <form>
         <div className='mb-5'>
          
            {/* <label htmlFor="name"><strong>Permission</strong></label> */}
           <div className="d-flex">
                <input type="name" placeholder='Enter Permission' name='name'
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
                
                <TableCell align="left">Permission ID</TableCell>
                <TableCell align="left">Permissions</TableCell>
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


export default AdminPermission;