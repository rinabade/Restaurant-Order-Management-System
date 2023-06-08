import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "../Table.css";

function createData(Category, Item, Description, Price, Image, Action) {
    return { Category, Item, Description, Price, Image, Action };
}

const rows = [
    createData("Lunch", "rice", "fshdfuhsdfd", "100", "food.jpg"),

];

export default function BasicTable() {
    const [open, setOpen] = React.useState(false);
    const [newItem, setNewItem] = React.useState({ category: "", item: "", description: "", price: "", image: "" });

    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
    const [confirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleAddItem = () => {
        // Add your logic here to handle adding the new item
        console.log(newItem);

        // Reset the form
        setNewItem({ category: "", item: "", description: "", price: "", image: "" });

        // Close the modal
        handleClose();
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setNewItem((prevItem) => ({
            ...prevItem,
            image: file,
        }));
    };

    const handleDeleteClick = (row) => {
        setDeleteItemId(row);
        setConfirmDeleteDialogOpen(true);
    };

    const handleEditClick = (row) => {
        setEditItemId(row);
        setConfirmEditDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        // Perform the delete operation
        if (deleteItemId) {
            // Add your delete logic here
            console.log("Delete item with ID:", deleteItemId);

            setDeleteItemId(null);
            setConfirmDeleteDialogOpen(false);
        }
    };

    const handleConfirmEdit = () => {
        // Perform the edit operation
        if (editItemId) {
            // Add your edit logic here
            console.log("Edit item with ID:", editItemId);

            setEditItemId(null);
            setConfirmEditDialogOpen(false);
        }
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
        <div className="Table">
            <h3>Menu </h3>
            <div className="registerbtn mb-5 mt-5">
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Create Menu
                </Button>
            </div>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Item Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.Category}</TableCell>
                                <TableCell align="left">{row.Item}</TableCell>
                                <TableCell align="left">{row.Description}</TableCell>
                                <TableCell align="left">{row.Price}</TableCell>
                                <TableCell align="left">{row.Image}</TableCell>
                                <TableCell align="left">
                                    <Button className=" bg-success" style={{ border: "none", color: "white" }} onClick={() => handleEditClick(row)}>Edit</Button>
                                    <Button style={{ marginLeft: "10px", backgroundColor: "#CD5C5C", border: "none", color: "white" }} onClick={() => handleDeleteClick(row)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2>Add Menu</h2>
                    <form>
                        <TextField
                            name="category"
                            label="Enter Category"
                            value={newItem.category}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="item"
                            label="Enter Item Name"
                            value={newItem.item}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="description"
                            label="write description"
                            value={newItem.description}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="price"
                            label="Enter Price"
                            value={newItem.price}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <div className="upload-image-container">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="upload-image-input"
                                id="upload-image"
                            />
                            <label htmlFor="upload-image" className="upload-image-label">
                                Choose Image
                            </label>
                            <br></br>
                            <span className="upload-image-text">{newItem.image ? newItem.image.name : "No file chosen"}</span>
                        </div>
                        <Button variant="contained" color="success" onClick={handleAddItem}>
                            Add
                        </Button>
                        <Button variant="contained" color="error" style={{ marginLeft: "10px" }} onClick={handleAddItem}>
                            Cancel
                        </Button>

                    </form>
                </Box>
            </Modal>
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
                    <Button onClick={handleCancelDelete} style={{ color: "white", backgroundColor: "#CD5C5C", border: "none" }}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} style={{ color: "white", backgroundColor: "#044cd0", border: "none" }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Edit */}
            <Dialog
                open={confirmEditDialogOpen}
                onClose={handleCancelEdit}
                maxWidth="xs"
            >
                <DialogTitle>Edit Menu</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="category"
                            label="Enter Category"
                            value={newItem.category}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="item"
                            label="Enter Item Name"
                            value={newItem.item}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="description"
                            label="write description"
                            value={newItem.description}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="price"
                            label="Enter Price"
                            value={newItem.price}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <div className="upload-image-container">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="upload-image-input"
                                id="upload-image"
                            />
                            <label htmlFor="upload-image" className="upload-image-label">
                                Choose Image
                            </label>
                            <br></br>
                            <span className="upload-image-text">{newItem.image ? newItem.image.name : "No file chosen"}</span>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEdit} style={{ color: "white", backgroundColor: "#CD5C5C", border: "none" }}>Cancel</Button>
                    <Button onClick={handleConfirmEdit} style={{ color: "white", backgroundColor: "#044cd0", border: "none" }}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}