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

// function createData(Firstname,Lastname,Email,Password,Address,Phone,Gender, Jobtitle,Date,Salary,Status,Action ) {
//   return { Firstname, Lastname,  Email,Password, Address, Phone, Gender, Jobtitle,Date,Salary,Status,Action };
// }

// const rows = [
//   createData("Ram","stha","example@gmail.com","fsghshsdc","baneshwor", "9818035087","male","cashier","2020/02/22","1000","Full-time"),
// ]

export default function BasicTable() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

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
                      className=" bg-success"
                      style={{ border: "none", color: "white", height: "25px" }}
                    >
                      Edit
                    </Button>

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
                    
                    {/* <Button
                      style={{
                        marginTop: "5px",
                        backgroundColor: "#CD5C5C",
                        border: "none",
                        color: "white",
                        height: "25px",
                      }}
                    >
                      Delete
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
