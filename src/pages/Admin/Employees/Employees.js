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
import "../Table.css";
import { useState, useEffect } from "react";
import {
  getAllUsers,
  deleteUser,
  editUser,
  getUser,
} from "../../../api/userAction";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dropdown from "react-bootstrap/Dropdown";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../Table.css";

export default function BasicTable() {
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState("select");
  const [radio1, setRadio1] = useState("");
  const [radio2, setRadio2] = useState("");

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [editItem, setEditItem] = React.useState(null);
  const [editedItem, setEditedItem] = React.useState([]);

  const [data, setData] = useState([]);

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    password: "",
    phone: "",
    address: "",
    job_title: "",
    hire_date: "",
    salary_information: "",
    employee_status: "",
  });

  const handleRegisterClick = () => {
    navigate("/admin/AdminRegister");
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getAllUsers().then(
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

  const handleDropdownChange = (event) => {
    setDropdown(event.target.value);
    setValues((prevValues) => ({
      ...prevValues,
      job_title: event.target.value,
    }));
  };

  const handleRadioChange = (event) => {
    setRadio1(event.target.value);
    setValues((prevValues) => ({
      ...prevValues,
      gender: event.target.value,
    }));
  };

  const handleRadioChange2 = (event) => {
    setRadio2(event.target.value);
    setValues((prevValues) => ({
      ...prevValues,
      employee_status: event.target.value,
    }));
  };

  // Deletee function

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation
    if (deleteItemId) {
      deleteUser(deleteItemId)
        .then((response) => {
          console.log("User deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.employee_id !== deleteItemId)
          );
          setDeleteItemId(null);
          setConfirmDialogOpen(false);
        })
        .catch((error) => {
          console.log("An error occurred while deleting the user");
          setDeleteItemId(null);
          setConfirmDialogOpen(false);
        });
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setConfirmDialogOpen(false);
  };

  // Edit handle

  const handleEditClick = (employeeData) => {
    setEditItem(employeeData);
    setEditedItem({ ...employeeData });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Make the PATCH API request to update the edited item
    editUser(editedItem.employee_id, editedItem)
      .then((response) => {
        // Handle successful response
        console.log("User updated successfully");
        // Optionally, perform additional actions after successful update
        // For example, you can update the table data with the updated item
        let index = data.findIndex(o => o.employee_id === editedItem.employee_id)
        if(index > -1){
          data[index] = editedItem;
          setData(data)
        }
        handleCloseEdit();
      })
      .catch((error) => {
        // Handle error response
        console.error("An error occurred while updating the user");
        // Optionally, display an error message to the user
      });
  };

  const handleCloseEdit = () => {
    setEditItem(null);
  };

  return (
    <>
      <div className="Table">
        <h3>Employees</h3>
        <div className="registerbtn mb-5 mt-5">
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterClick}
          >
            Register Employee
          </Button>
        </div>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee_ID </TableCell>
                <TableCell align="left">FirstName</TableCell>
                <TableCell align="left">LastName</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Job Title</TableCell>
                <TableCell align="left">Date of hire</TableCell>
                <TableCell align="left">Salary</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {data.map((dataItem, employee_id) => (
                <TableRow key={employee_id}>
                  <TableCell component="th" scope="row">
                    {dataItem.employee_id}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.firstname}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.lastname}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.email}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.gender}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.address}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.phone}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.job_title}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.hire_date}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.salary_information}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {dataItem.employee_status}
                  </TableCell>
                  <TableCell align="left" className="Details">
                    <Button
                      onClick={() => handleDeleteClick(dataItem.employee_id)} // Pass the corresponding id to the handleDeleteClick function
                      style={{
                        marginTop: "5px",
                        backgroundColor: "#CD5C5C",
                        border: "none",
                        color: "white",
                        height: "25px",
                      }}
                    >
                      Delete
                    </Button>

                    <Button
                      className=" bg-success"
                      style={{ border: "none", color: "white", height: "25px" }}
                      onClick={() => handleEditClick(dataItem)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Edit Modal */}
        <Modal open={Boolean(editItem)} onClose={handleCloseEdit}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h3>Edit Employee</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="d-flex flex-row justify-content-around">
                <div className="mb-3">
                  <label htmlFor="name">
                    <strong>First Name</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter FirstName"
                    name="firstname"
                    id="firstname"
                    value={editedItem.firstname}
                    className="form-control rounded-0"
                    required
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name">
                    <strong>Last Name</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter LastName"
                    name="lastname"
                    value={editedItem?.lastname}
                    className="form-control rounded-0"
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div className="mb-3">
                  <label htmlFor="email">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={editedItem.email}
                    className="form-control rounded-0"
                    required
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password">
                    <strong>Password</strong>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={editedItem.password}
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        password: e.target.value,
                      }))
                    }
                    className="form-control rounded-0"
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div className="mb-3">
                  <label htmlFor="phone">
                    <strong>Address</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        address: e.target.value,
                      }))
                    }
                    value={editedItem.address}
                    className="form-control rounded-0"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone">
                    <strong>Phone number</strong>
                  </label>
                  <input
                    type="varchar"
                    placeholder="Enter Phone number"
                    name="phone"
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        phone: e.target.value,
                      }))
                    }
                    value={editedItem.phone}
                    className="form-control rounded-0"
                    required
                  />
                </div>
              </div>

              <div className="mb-3 d-flex justify-content-around">
                <label htmlFor="gender" className=" mr-5">
                  <strong>Gender:</strong>
                </label>
                <div class="form-check form-check-inline mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="male"
                    checked={radio1 === "Male"}
                    value="Male"
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        gender: e.target.value,
                      }))
                    }
                    disabled
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="female"
                    checked={radio1 === "Female"}
                    value="Female"
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        gender: e.target.value,
                      }))
                    }
                    disabled
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Female
                  </label>
                </div>
              </div>

              <div className="mb-3 d-flex justify-content-around">
                <label htmlFor="gender" className=" mr-5">
                  <strong>Job title:</strong>
                </label>
                <select value={dropdown} onChange={handleDropdownChange} disabled>
                
                  <option value="select">Select :</option>
                  <option value="admin">Admin</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div className="mb-3">
                  <label htmlFor="password">
                    <strong>Date of hire</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Date"
                    name="hire_date"
                    value={editedItem.hire_date}
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        hire_date: e.target.value,
                      }))
                    }
                    className="form-control rounded-0"
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone">
                    <strong>Salary Information</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter salary"
                    name="salary_information"
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        salary_information: e.target.value,
                      }))
                    }
                    value={editedItem.salary_information}
                    className="form-control rounded-0"
                    required
                  />
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-around">
                <label htmlFor="gender" className=" mr-5">
                  <strong>Employee Status:</strong>
                </label>

                <div class="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={radio2 === "Part-time"}
                    value="Part-time"
                    onChange={handleRadioChange2}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Part-time
                  </label>
                </div>
                <div class="form-check form-check-inline mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={radio2 === "Full-time"}
                    value="Full-time"
                    onChange={handleRadioChange2}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Full-time
                  </label>
                </div>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginLeft: "10px" }}
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>
              </div>
            </form>
            {/* Add more fields as per your form requirements */}
          </Box>
        </Modal>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
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
            style={{
              color: "white",
              backgroundColor: "#CD5C5C",
              border: "none",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
