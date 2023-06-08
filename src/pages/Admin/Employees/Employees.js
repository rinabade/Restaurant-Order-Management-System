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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dropdown from 'react-bootstrap/Dropdown';
import TextField from "@mui/material/TextField";
import '../Table.css'

function createData(Firstname,Lastname,Email,Password,Address,Phone,Gender, Jobtitle,Date,Salary,Status,Action ) {
  return { Firstname, Lastname,  Email,Password, Address, Phone, Gender, Jobtitle,Date,Salary,Status,Action };
}

const rows = [
  createData("Ram","stha","example@gmail.com","fsghshsdc","baneshwor", "9818035087","male","cashier","2020/02/22","1000","Full-time"),
]


export default function BasicTable() {

  const navigate = useNavigate();

  const [editItem, setEditItem] = React.useState(null);
  const [editedItem, setEditedItem] = React.useState(null);

  const handleRegisterClick = () => {
    navigate("/admin/AdminRegister");
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
                  <Button className=" bg-success" style={{border:"none",color:"white",height:"25px"}} onClick={() => handleEditClick(row)}>Edit</Button> 
                    <Button style={{ marginTop: "5px", backgroundColor: "#CD5C5C", border:"none", color:"white",height:"25px"}}>Delete</Button> 
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
          <form >
          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="name"><strong>First Name</strong></label>
              <input type="text" placeholder='Enter Name' name='name'
                className="form-control rounded-0" required disabled />

            </div>
            <div className='mb-3'>
              <label htmlFor="name"><strong>Last Name</strong></label>
              <input type="text" placeholder='Enter Name' name='name'
              className="form-control rounded-0" required disabled />

            </div>

          </div>
          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" placeholder='Enter Email' name='email'
                className="form-control rounded-0" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" placeholder='Enter Password' name='password'
                className="form-control rounded-0" required />
            </div>

          </div>
          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="phone"><strong>Address</strong></label>
              <input type="number" placeholder='Enter Address' name='phone'
                className="form-control rounded-0" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="phone"><strong>Phone number</strong></label>
              <input type="number" placeholder='Enter Phone number' name='phone'
                 className="form-control rounded-0" required />
            </div>
          </div>

          <div className='mb-3 d-flex justify-content-around'>
            <label htmlFor="gender" className=' mr-5'><strong>Gender:</strong></label>

            <div class="form-check form-check-inline mb-3">
              <input className="form-check-input" type="radio" value="option1" />
              <label className="form-check-label" for="inlineCheckbox1">Male</label>
            </div>
            <div className="form-check form-check-inline mb-3">
              <input className="form-check-input" type="radio" value="option2" />
              <label classNmae="form-check-label" for="inlineCheckbox2">Female</label>
            </div>

          </div>

          <div className='mb-3 d-flex justify-content-around'>
            <label htmlFor="gender" className=' mr-5'><strong>Job title:</strong></label>

            <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
        Choose job title
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Kitchen</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Casher</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </div>

          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Date of hire</strong></label>
              <input type="password" placeholder='Enter Date' name='password'
                className="form-control rounded-0" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="phone"><strong>Salary Information</strong></label>
              <input type="amount" placeholder='Enter salary' name='phone'
                 className="form-control rounded-0" required />
            </div>
          </div>
          <div className='mb-3 d-flex justify-content-around'>
            <label htmlFor="gender" className=' mr-5'><strong>Employee Status:</strong></label>

            <div class="form-check form-check-inline">
              <input className="form-check-input" type="radio" value="option1" />
              <label className="form-check-label" for="inlineCheckbox1">Part-time</label>
            </div>
            <div class="form-check form-check-inline mb-3">
              <input className="form-check-input" type="radio" value="option1" />
              <label className="form-check-label" for="inlineCheckbox1">Full-time</label>
            </div>
          </div>
        

        </form>
          {/* Add more fields as per your form requirements */}

          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Save
          </Button>
          <Button variant="contained" color="error" style={{ marginLeft: "10px" }} onClick={handleCloseEdit}>
            Cancel
          </Button>
        </Box>
      </Modal>
      </div>
  );
}
