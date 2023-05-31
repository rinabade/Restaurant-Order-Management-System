import * as React from "react";
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

    return (
        <div className="Table">
            <h3>Menu </h3>
            <div className="registerbtn mb-5 mt-5">
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add Item
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
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="left">{row.Category}</TableCell>
                                <TableCell align="left">{row.Item}</TableCell>
                                <TableCell align="left">{row.Description}</TableCell>
                                <TableCell align="left">{row.Price}</TableCell>
                                <TableCell align="left">{row.Image}</TableCell>
                                <TableCell align="left">
                                    <Button className=" bg-success" style={{ border: "none", color: "white" }}>Edit</Button>
                                    <Button style={{ marginLeft: "10px", backgroundColor: "#CD5C5C", border: "none", color: "white" }}>Delete</Button>
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
                    <h2>Add Item</h2>
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
        </div>
    );
}