import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import img from "../../../imgs/profile.png";
import "./Admin_profile.css";
import Avatar from "react-avatar-edit";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import { editPassword, editProfile, getUser } from "../../../api/userAction";

const Admin_profiledata = () => {
  const [image, setImage] = useState("");
  const [imageCrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setPView] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isChangingInformation, setIsChangingInformation] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = React.useState([]);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect((id) => {
    getUser().then(
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

  const profileFinal = profile.length ? profile[0].pview : "";

  const onClose = () => {
    setPView(false);
  };

  const onCrop = (view) => {
    setPView(view);
  };

  const saveCropImage = () => {
    setProfile([{ pview: pview }]);
    setImageCrop(false);
    setShowDialog(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const openDialog = () => {
    setImageCrop(true);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleChangeInformation = (employeeData) => {
    setEditItemId(employeeData);
    setEditedItem({ ...employeeData });
    setIsChangingInformation(true);
  };

  const handleSubmitInformation = (event) => {
    event.preventDefault();
    editProfile(editedItem.employee_id, editedItem)
      .then((response) => {
        console.log("Profile updated successfully");
        let index = data.findIndex(
          (o) => o.employee_id === editedItem.employee_id
        );
        if (index > -1) {
          data[index] = editedItem;
          setData(data);
        }
        handleCloseEdit();
      })
      .catch((error) => {
        console.error("An error occurred while updating the user");
      });
    setIsChangingInformation(false);
  };

  const handleChangePassword = (employeeData) => {
    setEditItemId(employeeData);
    setEditedItem({ ...employeeData });
    setIsChangingPassword(true);
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    editPassword(editedItem.employee_id, editedItem)
      .then((response) => {
        console.log("Permission updated successfully");
        let index = data.findIndex(
          (o) => o.employee_id === editedItem.employee_id
        );
        if (index > -1) {
          data[index] = editedItem;
          setData(data);
        }
        handleCloseEdit();
      })
      .catch((error) => {
        console.error("An error occurred while updating the user");
      });
    setIsChangingPassword(false);
  };

  const handleCloseEdit = () => {
    setEditItemId(null);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="glass p-3 rounded w-50">
        <div className="profile_img text-center p-4">
          <div className="flex flex-column justify-content-center align-items-center ">
            <img
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid green",
              }}
              onClick={openDialog}
              src={profileFinal || img}
              alt=""
            />
            <br />
            <label htmlFor="" className="mt-3 fw-bold fs-2">
              Aditi Shrestha
            </label>
            {showDialog && (
              <div className="dialog-overlay">
                <Dialog
                  visible={imageCrop}
                  header={() => (
                    <p htmlFor="" className="fs-3 fw-semibold textColor">
                      Update Profile
                    </p>
                  )}
                  onHide={closeDialog}
                  className="dialog-container"
                  modal
                >
                  <div className="confirmation-content flex flex-row align-items-center">
                    <Avatar
                      width={300}
                      height={200}
                      onCrop={onCrop}
                      onClose={onClose}
                      src={src}
                      shadingColor={"#474649"}
                      backgroundColor={"#474649"}
                    />

                    <Button
                      onClick={saveCropImage}
                      label="Save Changes"
                      icon=""
                      className="btn bg-success text-white mt-3"
                    />
                  </div>
                </Dialog>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <form>
          <div className="mb-3 d-flex justify-content-around">
            <label htmlFor="name">
              <strong>First name</strong>: {data.firstname}
            </label>

            <label htmlFor="name">
              <strong>Last name</strong>: {data.lastname}
            </label>
          </div>
          <div className="mb-3 d-flex justify-content-around">
            <label htmlFor="email">
              <strong>Email:</strong>
              {data.email}
            </label>
            <label htmlFor="address">
              <strong>Address:</strong> {data.address}
            </label>
          </div>
          <div className="mb-3 d-flex justify-content-around">
            {/* <label htmlFor='password'>
              <strong>Email:</strong>
            </label> */}
            <label htmlFor="phone">
              <strong>Phone number:</strong> {data.phone}
            </label>
          </div>
          <div className="change flex-row d-flex justify-content-around">
            <button
              type="button"
              className="btn btn2 rounded-12"
              onClick={handleChangeInformation}
            >
              Change Information
            </button>
            <button
              type="button"
              className="btn btn2 rounded-12 "
              onClick={handleChangePassword}
            >
              Change password
            </button>
          </div>
        </form>
        {isChangingInformation && (
          <div className="dialog-overlay1">
            <Dialog
              visible={isChangingInformation}
              header={() => (
                <p htmlFor="" className="fs-3 fw-semibold textColor">
                  Change Information
                </p>
              )}
              onHide={() => setIsChangingInformation(false)}
              className="dialog-container1"
              modal
            >
              <form onSubmit={handleSubmitInformation}>
                <div className="d-flex flex-row justify-content-around">
                  <div className="mb-3">
                    <label htmlFor="name">First name</label>
                    <input
                      type="text"
                      name="firstname"
                      onChange={(e) =>
                        setEditedItem((prevItem) => ({
                          ...prevItem,
                          firstname: e.target.value,
                        }))
                      }
                      value={editedItem.firstname}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name">Last name</label>
                    <input
                      type="text"
                      name="lastname"
                      onChange={(e) =>
                        setEditedItem((prevItem) => ({
                          ...prevItem,
                          lastname: e.target.value,
                        }))
                      }
                      value={editedItem.lastname}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-around">
                  <div className="mb-3">
                    <label htmlFor="name">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) =>
                        setEditedItem((prevItem) => ({
                          ...prevItem,
                          email: e.target.value,
                        }))
                      }
                      value={editedItem.email}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name">Address</label>
                    <input
                      type="text"
                      name="address"
                      onChange={(e) =>
                        setEditedItem((prevItem) => ({
                          ...prevItem,
                          address: e.target.value,
                        }))
                      }
                      value={editedItem.address}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="name">Phone number</label>
                  <input
                    type="number"
                    name="phone"
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        phone: e.target.value,
                      }))
                    }
                    value={editedItem.phone}
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="btn bg-success text-white"
                  style={{
                    variant: "contained",
                    color: "primary",
                  }}
                >
                  Save
                </Button>
                <Button
                  // type="danger"
                  className="btn bg-danger text-white"
                  style={{
                    marginLeft: "10px",
                    variant: "contained",
                    color: "error",
                  }}
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>
              </form>
            </Dialog>
          </div>
        )}

        {isChangingPassword && (
          <div className="dialog-overlay1">
            <Dialog
              visible={isChangingPassword}
              header={() => (
                <p htmlFor="" className="fs-3 fw-semibold textColor">
                  Change Password
                </p>
              )}
              onHide={() => setIsChangingPassword(false)}
              className="dialog-container1"
              modal
            >
              <form onSubmit={handleSubmitPassword}>
                <div className="mb-3">
                  <label htmlFor="name">Current password</label>
                  <input
                    type="password"
                    placeholder="Enter Current password"
                    name="o_password"
                    value={editedItem?.o_password}
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        o_password: e.target.value,
                      }))
                    }
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name">New password</label>
                  <input
                    type="password"
                    placeholder="Enter New password"
                    name="n_password"
                    value={editedItem?.n_password}
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        n_password: e.target.value,
                      }))
                    }
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name">Confirm password</label>
                  <input
                    type="password"
                    placeholder="Enter New password"
                    name="c_password"
                    value={editedItem?.c_password}
                    onChange={(e) =>
                      setEditedItem((prevItem) => ({
                        ...prevItem,
                        c_password: e.target.value,
                      }))
                    }
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  // label="Save Password"
                  className="btn bg-success text-white"
                >
                  Save
                </Button>
                <Button
                  // type="danger"
                  className="btn bg-danger text-white"
                  style={{
                    marginLeft: "10px",
                    variant: "contained",
                    color: "error",
                  }}
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>
              </form>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_profiledata;
