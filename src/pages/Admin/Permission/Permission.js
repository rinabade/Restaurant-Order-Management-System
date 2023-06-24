import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Table.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "react-bootstrap";
import {
  createPermission,
  deletePermission,
  getAllPermission,
  editPermission,
} from "../../../api/userAction";
import { useEffect } from "react";

function AdminPermission() {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = React.useState([]);
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

  const handleEditClick = (permissionData) => {
    setEditItemId(permissionData);
    setEditedItem({ ...permissionData });
    setConfirmEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation
    if (deleteItemId) {
      deletePermission(deleteItemId)
        .then((response) => {
          console.log("Permission deleted successfully");
          setData((prevData) =>
            prevData.filter(
              (dataItem) => dataItem.permission_id !== deleteItemId
            )
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

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    // Make the PATCH API request to update the edited item
    editPermission(editedItem.permission_id, editedItem)
      .then((response) => {
        // Handle successful response
        console.log("Permission updated successfully");
        // Optionally, perform additional actions after successful update
        // For example, you can update the table data with the updated item
        let index = data.findIndex(
          (o) => o.permission_id === editedItem.permission_id
        );
        if (index > -1) {
          data[index] = editedItem;
          setData(data);
        }
        handleCancelEdit();
      })
      .catch((error) => {
        // Handle error response
        console.error("An error occurred while updating the user");
        // Optionally, display an error message to the user
      });
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setConfirmDeleteDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setConfirmEditDialogOpen(false);
  };

  // export default function BasicTable() {
  return (
    <div className="Table ">
      <h3 className="mb-5">Permissions</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          {/* <label htmlFor="name"><strong>Permission</strong></label> */}
          <div className="d-flex">
            <input
              type="text"
              placeholder="Enter Permission"
              name="permission_name"
              onChange={handleChange}
              value={values.permission_name}
              className="form-control rounded-0 w-50"
              required
            />

            <button
              type="submit"
              className="add btn text-white rounded-12 bg-primary"
            >
              Add
            </button>

            <button
              type="submit"
              className="delete btn text-white rounded-12 bg-danger "
            >
              Cancel
            </button>
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
            {data.map((dataItem, permission_id) => (
              <TableRow
                key={permission_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dataItem.permission_id}
                </TableCell>
                <TableCell align="left">{dataItem.permission_name}</TableCell>
                <TableCell align="left">
                  <Button
                    className=" bg-success"
                    style={{ border: "none" }}
                    onClick={() => handleEditClick(dataItem)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#CD5C5C",
                      border: "none",
                    }}
                    onClick={() => handleDeleteClick(dataItem.permission_id)}
                  >
                    Delete
                  </Button>
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
          Are you sure you want to delete this permission?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmDelete}
            style={{
              color: "white",
              backgroundColor: "#044cd0",
              border: "none",
            }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCancelDelete}
            style={{ backgroundColor: "#CD5C5C", border: "none" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Edit */}
      <Dialog
        open={confirmEditDialogOpen}
        onClose={handleCancelEdit}
        maxWidth="100%"
      >
        <DialogTitle>Edit Permission</DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirmEdit}>
            <div className="d-flex flex-row justify-content-around"> </div>
            <div className="d-flex flex-row justify-content-around">
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Permission</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Permission"
                  name="name"
                  onChange={(e) =>
                    setEditedItem((prevItem) => ({
                      ...prevItem,
                      permission_name: e.target.value,
                    }))
                  }
                  value={editedItem.permission_name}
                  className="form-control rounded-0"
                  required
                  // disabled
                />
              </div>
            </div>
            <Button
              onClick={handleConfirmEdit}
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#044cd0",
                border: "none",
              }}
            >
              Save
            </Button>
            <Button
              onClick={handleCancelEdit}
              style={{ backgroundColor: "#CD5C5C", border: "none" }}
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminPermission;
