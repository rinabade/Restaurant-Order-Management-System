import * as React from "react";
import { useState, useEffect } from "react";
// import { useState } from "react";
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
import { createRole, deleteRole, editRole, getAllRole } from "../../../api/userAction";
import { Navigate } from "react-router-dom";

function AdminRole() {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = React.useState([]);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);

  const refreshPage = () => {
    Navigate(0);
}

  const [values, setValues] = useState({
    role_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createRole(values)
      .then((response) => {
        console.log(response.data);
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
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
    getAllRole().then(
      (success) => {
        if (success.data) {
          console.log(success.data.data);
          setData(success.data.data);
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log("Server not working");
        }
      }
    );
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleEditClick = (roleData) => {
    setEditItemId(roleData);
    setEditedItem({ ...roleData });
    setConfirmEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      deleteRole(deleteItemId)
        .then((response) => {
          console.log("Role deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.role_id !== deleteItemId)
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
    e.preventDefault(e);
    editRole(editedItem.role_id, editedItem)
      .then((response) => {
        console.log("Role updated successfully");

        let index = data.findIndex(o => o.role_id === editedItem.role_id)
        if(index > -1){
          data[index] = editedItem;
          setData(data)
        }
        handleCancelEdit();
      })
      .catch((error) => {
        console.error("An error occurred while updating the user");
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

  return (
    <div className="Table ">
      <h3 className="mb-5">Roles</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          {/* <label htmlFor="name"><strong>Roles</strong></label> */}
          <div className="d-flex">
            <input
              type="text"
              placeholder="Enter Role"
              name="role_name"
              onChange={handleChange}
              value={values.role_name}
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
              <TableCell align="left">Role ID</TableCell>
              <TableCell align="left">Roles</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {data.map((dataItem, role_id) => (
              <TableRow
                key={role_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dataItem.role_id}
                </TableCell>
                <TableCell align="left">{dataItem.role_name}</TableCell>
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
                    onClick={() => handleDeleteClick(dataItem.role_id)}
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
          Are you sure you want to delete this role?
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
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirmEdit}>
            <div className="d-flex flex-row justify-content-around"></div>
            <div className="d-flex flex-row justify-content-around">
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Role</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Role Name"
                  name="name"
                  onChange={(e) =>
                    setEditedItem((prevItem) => ({
                      ...prevItem,
                      role_name: e.target.value,
                    }))
                  }
                  value={editedItem.role_name}
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


export default AdminRole;
