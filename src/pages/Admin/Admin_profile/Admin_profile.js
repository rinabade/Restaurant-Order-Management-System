import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import img from "../../../imgs/profile.png";
import "./Admin_profile.css";
import Avatar from "react-avatar-edit";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import { editProfile, getUser } from "../../../api/userAction";

const Admin_profiledata = () => {
  const [image, setImage] = useState("");
  const [imageCrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setPView] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isChangingInformation, setIsChangingInformation] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  const [values, setValues] = useState([]);

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
  
  const handleChangeInformation = () => {
    setIsChangingInformation(true);
  };

  const handleSubmitInformation = (event) => {
    event.preventDefault();
    editProfile(values)
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
    // Handle form submission for change information
    setIsChangingInformation(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    // Handle form submission for change password
    setIsChangingPassword(false);
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
                      placeholder="Enter First name"
                      name="firstname"
                      onChange={handleChange}
                      value={values.firstname}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name">Last name</label>
                    <input
                      type="text"
                      placeholder="Enter Last name"
                      name="lastname"
                      onChange={handleChange}
                      value={values.lastname}
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
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name">Address</label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="name">Phone number</label>
                  <input
                    type="number"
                    placeholder="Enter phone number"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  label="Save Changes"
                  className="btn bg-success text-white"
                />
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
                    name="name"
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name">New password</label>
                  <input
                    type="password"
                    placeholder="Enter New password"
                    name="name"
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name">Confirm password</label>
                  <input
                    type="password"
                    placeholder="Enter New password"
                    name="name"
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  label="Save Password"
                  className="btn bg-success text-white"
                />
              </form>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_profiledata;
