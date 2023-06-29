import * as React from "react";
import { useState, useEffect } from "react";
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
import FormData from "form-data";
import "../Table.css";
import {
  createMenu,
  deleteMenu,
  editMenu,
  getAllCategory,
  getAllMenu,
  getMenu,
} from "../../../api/userAction";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);

  // const [dropdown, setDropdown] = useState("select");
  // const [menuData, setMenuData] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [editedItem, setEditedItem] = useState({
    item_name:'',
    description: '',
    price: ''
  });
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState({
    // file: [],
  });

  // const [categoryId, setCategoryId] = useState([]);
  // const [category, setCategory] = useState([]);
  const [Allcategory, setAllCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
}

  // function handleImage(e) {
  //   console.log(e.target.files);
  //   setImage(e.target.files[0]);
  // }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDropdownChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleImageUpload = (event) => {
    // setSelectedImage(event.target.files[0])
      if(event?.target?.files && event.target.files[0])
            setImage(event.target.files[0]);

      console.log(image)
    // console.log(selectedImage.file.name)
  };
  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setNewItem((prevItem) => ({
  //       ...prevItem,
  //       [name]: value,
  //     }));
  //   };

  const handleAddItem = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", selectedCategory);
    formData.append("item", item);
    formData.append("description", description);
    formData.append("price", price);
    if(image)
        formData.append("image", image);

    createMenu(formData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        // setData(response.data);

        refreshPage();
      })
      .catch((error) => {
        console.error(error);
      });

    // Close the modal
    // handleClose();
  };

  // get all data from database
  useEffect(() => {
    getAllMenu().then(
      (success) => {
        if (success.data) {
          // console.log(success.data.data);
          setValues(success.data.data);
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

    getMenu().then(
      (success) => {
        if (success.data) {
          // console.log(success.data.data);
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
          console.log("Server not working");
        }
      }
    );

    getAllCategory().then(
      (success) => {
        if (success.data && Array.isArray(success.data.data)) {
          // console.log(success.data.data);
          setAllCategory(success.data.data);
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          //Backend Error message
          console.log(error.response);
        } else {
          console.log("Server not working");
        }
      }
    );
  }, []);

  // Delete Function
  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (deleteItemId) {
      deleteMenu(deleteItemId)
        .then((response) => {
          // console.log("Permission deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.menu_id !== deleteItemId)
          );
        refreshPage();
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log("An error occurred while deleting the user");
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        });
        // / Add your delete logic here
      // console.log("Delete item with ID:", deleteItemId);

      // handleCancelDelete();
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setConfirmDeleteDialogOpen(false);
  };

  // Edit function
  const handleEditClick = (menuData) => {
    // setEditItemId(menuData);
    setEditedItem({ ...menuData });
    setConfirmEditDialogOpen(true);
  };

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    editMenu(editedItem.menu_id, editedItem)
      .then((response) => {
        console.log("Menu updated successfully");

        let index = data.findIndex((o) => o.menu_id === editedItem.menu_id);
        if (index > -1) {
          data[index] = editedItem;
          setData(data);

        }
        refreshPage();
        // handleCancelEdit();
      })
      .catch((error) => {
        console.error("An error occurred while updating the user");
      });
      // handleClose();
      handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditedItem(null);
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
              <TableCell align="left">Menu_ID</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Item Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Price</TableCell>
              {/* <TableCell align="left">Image</TableCell> */}
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((dataItem, menu_id) => (
              <TableRow key={menu_id}>
                <TableCell align="left">{dataItem.menu_id}</TableCell>
                <TableCell align="left">{dataItem.category_id}</TableCell>
                <TableCell align="left">{dataItem.item_name}</TableCell>
                <TableCell align="left">{dataItem.description}</TableCell>
                <TableCell align="left">{dataItem.price}</TableCell>
                {/* <TableCell align="left">{dataItem.image}</TableCell> */}
                <TableCell align="left">
                  <Button
                    className=" bg-success"
                    style={{ border: "none", color: "white" }}
                    onClick={() => handleEditClick(dataItem)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#CD5C5C",
                      border: "none",
                      color: "white",
                    }}
                    onClick={() => handleDeleteClick(dataItem.menu_id)}
                  >
                    Delete
                  </Button>
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
          <form onSubmit={handleAddItem} encType="multipart/form-data">
            <br></br>
            <label htmlFor="category" className=" mr-5">
              <strong>Category : </strong>
            </label>

            <select value={selectedCategory} onChange={handleDropdownChange}>
              <option>Select Category :</option>
              {Allcategory.map((dataItem) => (
                <option key={dataItem.category_id} value={dataItem.category_id}>
                  {dataItem.category_name}
                </option>
              ))}
            </select>

            <TextField
              name="item_name"
              label="Enter Item Name"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="write description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="price"
              label="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
            />
            <div
              className="upload-image-container"
              encType="multipart/form-data"
            >
            <label htmlFor="upload-image" className="upload-image-label">
                Choose Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                // value={selectedImage}
                onChange={handleImageUpload}
                className="upload-image-input"
                id="upload-image"
              />
              <br></br>
              <span className="upload-image-text">
                {image? image.name : "No file chosen"}
              </span>
            </div>
              {image ? <><img src={URL.createObjectURL(image)} width={200} /><br/></> : null }

            <Button type="submit" variant="contained" color="success">
              Add
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "10px" }}
              onClick={handleClose}
            >
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
          Are you sure you want to delete this menu?
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

      {/* Confirmation Dialog for Edit */}
      <Dialog
        open={confirmEditDialogOpen}
        onClose={handleCancelEdit}
        maxWidth="xs"
      >
        <DialogTitle>Edit Menu</DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirmEdit}>

            <TextField
              name="item_name"
              label="Enter Item Name"
              value={editedItem ? editedItem.item_name : ''}
              // onChange={(e) => setItem(e.target.value)}
              onChange={(e) =>
                setEditedItem((prevItem) => ({
                  ...prevItem,
                  item_name: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="write description"
              value={editedItem ? editedItem.description : ''}
              // onChange={(e) => setDescription(e.target.value)}
              onChange={(e) =>
                setEditedItem((prevItem) => ({
                  ...prevItem,
                  description: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="price"
              label="Enter Price"
              value={editedItem ? editedItem.price : ''}
              // onChange={(e) => setPrice(e.target.value)}
              onChange={(e) =>
                setEditedItem((prevItem) => ({
                  ...prevItem,
                  price: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />
            <br></br>

              <Button
                type="submit"
                onClick={handleConfirmEdit}
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
              style={{
                left : "10px",
                color: "white",
                backgroundColor: "#CD5C5C",
                border: "none",
              }}
            >
              Cancel
            </Button>
            {/* </DialogActions> */}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
