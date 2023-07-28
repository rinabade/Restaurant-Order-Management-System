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
    getMenu, uploadImage,
} from "../../../api/userAction";
import { useNavigate } from "react-router-dom";
import {Config} from "../../../Config";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({})
  const [values, setValues] = useState([]);

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const npage = Math.ceil(values.length / pageSize);
  const pages = [...Array(npage + 1).keys()].slice(1);
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const records = values.slice(firstIndex, lastIndex);

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
      if(event?.target?.files && event.target.files[0]) {
          let image = event.target.files[0];
          let formData = new FormData()
          formData.set("image", image)
          uploadImage(formData).then((success) => {
              console.log(success);
              if(success?.data && success.data[0]){
                  setImage(success.data[0]);
                  setNewData({...newData, "image":success.data[0]})
              }

          })

      }
  };
  const handleImageEdit = (event) => {
    // setSelectedImage(event.target.files[0])
      if(event?.target?.files && event.target.files[0]) {
          let image = event.target.files[0];
          let formData = new FormData()
          formData.set("image", image)
          uploadImage(formData).then((success) => {
              console.log(success);
              if(success?.data && success.data[0]){
                  setEditedItem({...editedItem, "image":success.data[0]})
              }

          })

      }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if(image)

    createMenu(newData)
      .then((response) => {
        console.log(response.data);
        if(response?.data){
            setNewData({})
        }
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get all data from database
  useEffect(() => {
    getAllMenu().then(
      (success) => {
        if (success.data) {
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
          setData(success.data.data);
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

    getAllCategory().then(
      (success) => {
        if (success.data && Array.isArray(success.data.data)) {
          setAllCategory(success.data.data);
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
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setConfirmDeleteDialogOpen(false);
  };

  // Edit function
  const handleEditClick = (menuData) => {
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
      })
      .catch((error) => {
        console.error("An error occurred while updating the user");
      });
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
            {records.map((dataItem, menu_id) => (
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

            <select value={newData?.category_id}
                    onChange={(e) => setNewData({...newData, "category_id":e.target.value})}
                    >
              <option>Select Category :</option>
              {Allcategory.map((dataItem) => (
                <option key={dataItem.category_id} value={dataItem.category_id}>
                  {dataItem.category_name}
                </option>
              ))}
            </select>

            <TextField
              name="item"
              label="Enter Item Name"
              value={newData?.item}
              onChange={(e) => setNewData({...newData, "item":e.target.value})}
              fullWidth
              margin="normal"
              autoComplete="off"
            />
            <TextField
              name="description"
              label="write description"
              value={newData?.description}
              onChange={(e) => setNewData({...newData, "description":e.target.value})}
              fullWidth
              margin="normal"
              autoComplete="off"
            />
            <TextField
              name="price"
              label="Enter Price"
              value={newData?.price}
              onChange={(e) => setNewData({...newData, "price":e.target.value})}
              fullWidth
              margin="normal"
              autoComplete="off"
            />
            <div
              className="upload-image-container"
              encType="multipart/form-data"
            >
            {/* {isSucces !==null ? <h4> {isSucces} </h4> : null}    */}
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
                {selectedImage.image? selectedImage.image.name : "No file chosen"}
              </span>
            </div>
              {image ? <><img src={`${Config.BaseUrl}${image}`} width={200} /><br/></> : null }

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
              autoComplete="off"
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
              autoComplete="off"
            />
            <TextField
              name="price"
              label="Enter Price"
              value={editedItem ? editedItem.price : ''}
              onChange={(e) =>
                setEditedItem((prevItem) => ({
                  ...prevItem,
                  price: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
              autoComplete="off"
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
                      onChange={handleImageEdit}
                      className="upload-image-input"
                      id="upload-image"
                  />
                  <br></br>
                  <span className="upload-image-text">
                {editedItem?.image ? editedItem.name : "No file chosen"}
              </span>
              </div>
              {editedItem?.image ? <><img src={`${Config.BaseUrl}${editedItem.image}`} width={200} /><br/></> : null }

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
