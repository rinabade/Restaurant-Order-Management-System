import React, { useEffect, useState } from 'react'
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
import { deleteReservation, getReservation } from '../../../api/userAction';

const Tablebook = () => {

  const [data, setData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

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

  useEffect(()=>{
    getReservation()
    .then((response) => {
      setData(response.data.data)
    })
  }, [])

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete operation
    if (deleteItemId) {
      deleteReservation(deleteItemId)
        .then((response) => {
          console.log("Reservation deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.reservation_id !== deleteItemId)
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

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setConfirmDeleteDialogOpen(false);
  };
  

  return (
    <div className="Table">
    <h3>Table Reservation Details</h3>
    <TableContainer
      component={Paper}
      style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Reservation ID </TableCell> */}
            <TableCell>  Table Number </TableCell>
            <TableCell align="left">Customer's Name</TableCell>
            <TableCell align="left">Email Address</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Reservation Date</TableCell>
             <TableCell align="left">Reservation Time</TableCell>
             <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody style={{ color: "white" }}>
          {records.map((dataItem, reservation_id) => (

            <TableRow key={reservation_id}>
              {/* <TableCell component="th" scope="row"> {dataItem.reservation_id} </TableCell> */}
              <TableCell component="th" scope="row"> {dataItem.table_number} </TableCell>
              <TableCell align="left" className="table-cell"> {dataItem.name} </TableCell>
              <TableCell align="left" className="table-cell"> {dataItem.email} </TableCell>
              <TableCell align="left" className="table-cell"> {dataItem.phone_number} </TableCell>
              <TableCell align="left" className="table-cell"> {dataItem.reservation_date} </TableCell>
              <TableCell align="left" className="table-cell"> {dataItem.reservation_time} </TableCell>
               <TableCell align="left" className="table-cell">
               {/* <Button
                    className=" bg-success"
                    style={{ border: "none" }}
                  
                  >
                    Accept
                  </Button> */}

                  <Button
                    style={{                      
                      backgroundColor: "#CD5C5C",
                      border: "none",
                    }}
                    onClick={() => handleDeleteClick(dataItem.reservation_id)}
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
          Are you sure you want to cancel the reservation?
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

    </div>
  )
}

export default Tablebook