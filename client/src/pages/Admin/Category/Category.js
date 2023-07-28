import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "../Table.css";
import { Button } from "react-bootstrap";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "../../../api/userAction";
import { Navigate } from "react-router-dom";

export default function BasicTable() {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = React.useState([]);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);

  const refreshPage = () => {
    Navigate(0);
}

  const [values, setValues] = useState({
    category_name: "",
  });
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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


  const handleSubmit = (event) => {
    event.preventDefault();
    createCategory(values)
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


  useEffect(() => {
    getAllCategory().then(
      (success) => {
        if (success.data) {
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

  const handleEditClick = (categoryData) => {
    setEditItemId(categoryData);
    setEditedItem({ ...categoryData });
    setConfirmEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation
    if (deleteItemId) {
      deleteCategory(deleteItemId)
        .then((response) => {
          console.log("Category deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.category_id !== deleteItemId)
          );
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log("An error occurred while deleting the user");
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        });
      console.log("Delete item with ID:", deleteItemId);

      setDeleteItemId(null);
      setConfirmDeleteDialogOpen(false);
    }
  };

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    editCategory(editedItem.category_id, editedItem)
      .then((response) => {
        console.log("Category updated successfully");
        let index = data.findIndex(o => o.category_id === editedItem.category_id)
        if(index > -1){
          data[index] = editedItem;
          setData(data)
        }
        // handleCloseEdit();
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
      <h3 className="mb-5">Category</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name">
            <strong>Category name</strong>
          </label>
          <div className="d-flex">
            <input
              type="name"
              placeholder="Enter Category name"
              name="category_name"
              autoComplete="off"
              onChange={handleChange}
              value={values.category_name}
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
              <TableCell align="left">Category ID</TableCell>
              <TableCell align="left">Category Name</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {records.map((dataItem, category_id) => (
              <TableRow
                key={category_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dataItem.category_id}
                </TableCell>
                <TableCell align="left">{dataItem.category_name}</TableCell>
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
                    onClick={() => handleDeleteClick(dataItem.category_id)}
                  >
                    Delete
                  </Button>
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirmEdit}>
            <div className="d-flex flex-row justify-content-around">
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Category Name</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) =>
                    setEditedItem((prevItem) => ({
                      ...prevItem,
                      category_name: e.target.value,
                    }))
                  }
                  value={editedItem.category_name}
                  className="form-control rounded-0"
                  autoComplete="off"
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
            Edit
          </Button>
          <Button
            onClick={handleCancelEdit}
            style={{ backgroundColor: "#CD5C5C", border: "none" }}
          >
            Cancel
          </Button>
          </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}
