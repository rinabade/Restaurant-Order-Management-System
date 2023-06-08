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
import { useState } from "react";
import { useEffect } from "react";
import { getAllUsers, deleteUser } from "../../../api/userAction";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dropdown from "react-bootstrap/Dropdown";
import TextField from "@mui/material/TextField";
import "../Table.css";

// function createData(Firstname,Lastname,Email,Password,Address,Phone,Gender, Jobtitle,Date,Salary,Status,Action ) {
//   return { Firstname, Lastname,  Email,Password, Address, Phone, Gender, Jobtitle,Date,Salary,Status,Action };
// }

// const rows = [
//   createData("Ram","stha","example@gmail.com","fsghshsdc","baneshwor", "9818035087","male","cashier","2020/02/22","1000","Full-time"),
// ]

export default function BasicTable() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [editItem, setEditItem] = React.useState(null);
  const [editedItem, setEditedItem] = React.useState(null);

  const handleRegisterClick = () => {
    navigate("/admin/AdminRegister");
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

  const handleDeleteClick = (id) => {
    deleteUser(id)
      .then((response) => {
        // Handle the response if needed
        console.log("User deleted successfully");
        // Update the UI or fetch updated data

        // Filtering data
        setData((prevData) =>
          prevData.filter((dataItem) => dataItem.employee_id !== id)
        );
      })
      .catch((error) => {
        // Handle the error if needed
        console.log("An error occurred while deleting the user");
      });
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditedItem({ ...item }); // Create a copy of the item to track the edited changes
  };
  const handleSaveEdit = () => {
    // Add your logic here to save the edited item
    console.log(editedItem);

    // Close the modal
    setEditItem(null);
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
                <TableCell>FirstName </TableCell>
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
            <form>
              <div className="d-flex flex-row justify-content-around">
                <div className="mb-3">
                  <label htmlFor="name">
                    <strong>First Name</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
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
                    placeholder="Enter Name"
                    name="name"
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
                    className="form-control rounded-0"
                    required
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
                    className="form-control rounded-0"
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <div className="mb-3">
                  <label htmlFor="phone">
                    <strong>Address</strong>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Address"
                    name="phone"
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone">
                    <strong>Phone number</strong>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone number"
                    name="phone"
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
                    value="option1"
                  />
                  <label className="form-check-label" for="inlineCheckbox1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="option2"
                  />
                  <label classNmae="form-check-label" for="inlineCheckbox2">
                    Female
                  </label>
                </div>
              </div>

              <div className="mb-3 d-flex justify-content-around">
                <label htmlFor="gender" className=" mr-5">
                  <strong>Job title:</strong>
                </label>

                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    Choose job title
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Kitchen</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Casher</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div className="mb-3">
                  <label htmlFor="password">
                    <strong>Date of hire</strong>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Date"
                    name="password"
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone">
                    <strong>Salary Information</strong>
                  </label>
                  <input
                    type="amount"
                    placeholder="Enter salary"
                    name="phone"
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
                    value="option1"
                  />
                  <label className="form-check-label" for="inlineCheckbox1">
                    Part-time
                  </label>
                </div>
                <div class="form-check form-check-inline mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="option1"
                  />
                  <label className="form-check-label" for="inlineCheckbox1">
                    Full-time
                  </label>
                </div>
              </div>
            </form>
            {/* Add more fields as per your form requirements */}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
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
          </Box>
        </Modal>
      </div>
    </>
  );
}

//TODO for creating User use below function inside functional component
// function createData(payload) {
//     createUser(payload).then(
//         success => {
//             if(success.data) {
//                 console.log(success.data);
//             }else{
//                 console.log("Empty Error Response")
//             }
//         },
//         error => {
//             if(error.response) {
//                 //Backend Error message
//                 console.log(error.response)
//             }else{
//                 //Server Not working Error
//             }
//         }
//     )
// }
