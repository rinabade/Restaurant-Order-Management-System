import axios from "axios";
import { Config } from "../Config";

// For registration
export const getAllUsers = () => {
  let url = `${Config.BaseUrl}api/register`;
  return axios.get(url);
};
export const getUser = (id) => {
  let url = `${Config.BaseUrl}api/register/${id}`;
  return axios.get(url);
};
export const createUser = (data) => {
  let url = `${Config.BaseUrl}api/register/`;
  return axios.post(url, data);
};
export const editUser = (id, data) => {
  let url = `${Config.BaseUrl}api/register/${id}`;
  return axios.patch(url, data);
};
export const deleteUser = (id) => {
  let url = `${Config.BaseUrl}api/register/${id}`;
  return axios.delete(url);
};

// for category
export const createCategory = (data) => {
  let url = `${Config.BaseUrl}admin/category`;
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const getAllCategory = () => {
  let url = `${Config.BaseUrl}admin/category`;
  return axios.get(url);
};
export const getCategory = (id) => {
  let url = `${Config.BaseUrl}admin/category/${id}`;
  return axios.get(url);
};
export const editCategory = (id, data) => {
  let url = `${Config.BaseUrl}admin/category/${id}`;
  return axios.patch(url, data);
};
export const deleteCategory = (id) => {
  let url = `${Config.BaseUrl}admin/category/${id}`;
  return axios.delete(url);
};

// for Menu
export const createMenu = (formData) => {
  let url = `${Config.BaseUrl}admin/menu`;
  return axios.post(url, formData, {
    headers: { "Content-Type": "application/json" },
  });
};
export const getAllMenu = (data) => {
  let url = `${Config.BaseUrl}admin/menu/`;
  return axios.get(url, data);
};
export const getMenu = (id, data) => {
  let url = `${Config.BaseUrl}admin/menu/${id}`;
  return axios.get(url, data);
};
export const editMenu = (id, data) => {
  let url = `${Config.BaseUrl}admin/menu/${id}`;
  return axios.patch(url, data);
};
export const deleteMenu = (id) => {
  let url = `${Config.BaseUrl}admin/menu/${id}`;
  return axios.delete(url);
};

// image
export const uploadImage = (image) => {
  let url = `${Config.BaseUrl}upload/file-upload`;
  return axios.post(url, image);
};

export const uploadProfile = (image) => {
  let url = `${Config.BaseUrl}upload/profile-upload`;
  return axios.post(url, image);
};


// feedback
export const createFeedback = (data) => {
  let url = `${Config.BaseUrl}customer/feedback`;
  return axios.post(url, data);
};
export const getAllFeedback = () => {
  let url = `${Config.BaseUrl}customer/feedback`;
  return axios.get(url);
};
export const getFeedback = () => {
  let url = `${Config.BaseUrl}upload/file-service`;
  return axios.get(url);
};
export const deleteFeedback = (id) => {
  let url = `${Config.BaseUrl}customer/feedback/${id}`;
  return axios.delete(url);
};

// Profile
export const profileImage = (data) => {
  let url = `${Config.BaseUrl}change/profile`;
  return axios.post(url, data);
};
// Profile Update
export const editProfile = (id, data) => {
  let url = `${Config.BaseUrl}change/profile/${id}`;
  return axios.patch(url, data);
};

// Change Password
export const editPassword = (id, data) => {
  let url = `${Config.BaseUrl}change/password/${id}`;
  return axios.patch(url, data);
};


// add to cart
export const createOrder = (data) => {
  let url = `${Config.BaseUrl}customer/orderDetail`;
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllOrderDetails = () => {
  let url = `${Config.BaseUrl}customer/orders`;
  return axios.get(url);
};

export const getOrderDetails = () => {
  let url = `${Config.BaseUrl}customer/orderDetail`;
  return axios.get(url);
};

export const updateOrderStatus = (itemId, tableNumber) => {
  const url = `${Config.BaseUrl}customer/orderDetail/${itemId}`;
  const data = { table_number: tableNumber };
  return axios.patch(url, data);
};
export const DeleteOrder = (itemId) => {
  let url = `${Config.BaseUrl}customer/orderDetail/${itemId}`;
  // const data = { table_number: tableNumber };
  return axios.delete(url);
};



// search
 export const searchFood = (query) => {
    let url = `${Config.BaseUrl}customer/search/?query=${query}`;
    return axios.get(url);
  };

// Payment
export const createPayment = ({table_number, paymentMethod, transactionCode, totalPrice}) => {
  let url = `${Config.BaseUrl}customer/payment`;
  return axios.post(url, {table_number, paymentMethod, transactionCode, totalPrice});
};

export const updatePaymentStatus = (transactionCode, table_number, paymentMethod) => {
  let url = `${Config.BaseUrl}customer/payment/${transactionCode}`;
  const data = {table_number : table_number, paymentMethod: paymentMethod}
  return axios.patch(url, data);
}; 

export const getPaymentDetail = () => {
  let url =`${Config.BaseUrl}customer/payment`;
  return axios.get(url);
};

export const getOrders = () => {
  let url = `${Config.BaseUrl}customer/customerOrder`;
  return axios.get(url);
};


export const createReservation = (data) => {
  let url = `${Config.BaseUrl}customer/reservation`;
  // const data = {item, selectedTable}
  console.log(data)
  return axios.post(url, data);
};

export const getReservation = () => {
  let url = `${Config.BaseUrl}customer/reservation`;
  return axios.get(url);
};

export const deleteReservation = (id) => {
  let url = `${Config.BaseUrl}customer/reservation/${id}`;
  // const data = { table_number: tableNumber };
  return axios.delete(url);
};