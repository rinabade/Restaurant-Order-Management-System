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
import { Button } from "react-bootstrap";
import "../Table.css";
import { useEffect, useState } from "react";
import { deleteFeedback, getAllFeedback } from "../../../api/userAction";

export default function BasicTable() {
  const [data, setData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);


  useEffect(() => {
    getAllFeedback().then(
      (success) => {
        console.log(success.data);
        setData(success.data.data);
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
    // const handleDeleteClick = (row) => {
    //   setDeleteItemId(row);
    setConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      deleteFeedback(deleteItemId)
        .then((response) => {
          console.log("Category deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.feedback_id !== deleteItemId)
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
      <h3>Feedback</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Message</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {data.map((dataItem, feedback_id) => (
              <TableRow
                key={feedback_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dataItem.feedback_id}
                </TableCell>
                <TableCell align="left">{dataItem.fullname}</TableCell>
                <TableCell align="left">{dataItem.email}</TableCell>
                <TableCell align="left">
                  <span className="status">{dataItem.message}</span>
                </TableCell>
                <TableCell align="left">
                <Button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#CD5C5C",
                      border: "none",
                    }}
                    onClick={() => handleDeleteClick(dataItem.feedback_id)}
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
          Are you sure you want to delete this feedback?
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
  );
}