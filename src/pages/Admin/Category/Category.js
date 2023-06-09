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
import { useState, useEffect } from "react";
import { createCategory, getAllCategory } from "../../../api/userAction";


// function createData(name, ID, Category, Price, Action) {
//   return { name, ID, Category, Price, Action };
// }

// const rows = [
//   createData("Veg", 18908424, "momo", "200"),
//   createData("Chicken", 18908424, "momo", "200"),
 
// ];


 function Category() {

  const [data, setData] = useState([]);

  // const navigate = useNavigate();

  const [values, setValues] = useState({
    category_name : "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createCategory(values)
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

  useEffect(() => {
    getAllCategory().then(
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

  
  
  return (
      <div className="Table ">
      <h3 className="mb-5">Category</h3>
         
        <form onSubmit = {handleSubmit}>
         <div className='mb-5'>
          
            <label htmlFor="category_name">
              <strong>Category name</strong>
            </label>

           <div className="d-flex">
            
           <input
                type="text"
                placeholder="Enter category"
                name="category_name"
                onChange={handleChange}
                value={values.category_name}
                className="form-control rounded-0"
                required
              />
                 
              
      <button 
        type='submit' 
        className='add btn text-white rounded-12 bg-primary'
      >
        Add
      </button> 

      <button 
        type='submit' 
        className='delete btn text-white rounded-12 bg-danger '
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
              {data.map((dataItem, category_id) => (
                <TableRow
                  key={dataItem.category_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {dataItem.category_id}
                  </TableCell>
                  <TableCell align="left">{dataItem.category_name}</TableCell>
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


export default Category;