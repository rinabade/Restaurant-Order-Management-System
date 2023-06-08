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


function createData(name, ID, Category, Price, Action) {
  return { name, ID, Category, Price, Action };
}

const rows = [
  createData("Veg", 18908424, "momo", "200"),
  createData("Chicken", 18908424, "momo", "200"),

];


export default function BasicTable() {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);

  const handleDeleteClick = (row) => {
    setDeleteItemId(row);
    setConfirmDeleteDialogOpen(true);
  };

  const handleEditClick = (row) => {
    setEditItemId(row);
    setConfirmEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation
    if (deleteItemId) {
      // Add your delete logic here
      console.log("Delete item with ID:", deleteItemId);

      setDeleteItemId(null);
      setConfirmDeleteDialogOpen(false);
    }
  };

  const handleConfirmEdit = () => {
    // Perform the edit operation
    if (editItemId) {
      // Add your edit logic here
      console.log("Edit item with ID:", editItemId);

      setEditItemId(null);
      setConfirmEditDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setConfirmDeleteDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setConfirmEditDialogOpen(false);
  };

  return (
    <div className="Table ">
      <h3 className="mb-5">Roles</h3>

      <form>
        <div className='mb-5'>

          {/* <label htmlFor="name"><strong>Roles</strong></label> */}
          <div className="d-flex">
            <input type="name" placeholder='Enter Role' name='name'
              className="form-control rounded-0 w-50" required />


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
                  <Button className=" bg-success" style={{ border: "none" }} onClick={() => handleEditClick(row)}>Edit</Button>
                  <Button style={{ marginLeft: "10px", backgroundColor: "#CD5C5C", border: "none" }} onClick={() => handleDeleteClick(row)}>Delete</Button>
                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} style={{ backgroundColor: "#CD5C5C", border: "none" }}>Cancel</Button>
          <Button onClick={handleConfirmDelete} style={{ color: "white", backgroundColor: "#044cd0", border: "none" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Edit */}
      <Dialog
        open={confirmEditDialogOpen}
        onClose={handleCancelEdit}
        maxWidth="100%"
      >
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <form>
            <div className="d-flex flex-row justify-content-around">
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Role ID</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  name="name"
                  className="form-control rounded-0"
                  required
                  disabled
                />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Role</strong>
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  className="form-control rounded-0"
                  required
                  disabled
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} style={{ backgroundColor: "#CD5C5C", border: "none" }}>Cancel</Button>
          <Button onClick={handleConfirmEdit} style={{ color: "white", backgroundColor: "#044cd0", border: "none" }}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}