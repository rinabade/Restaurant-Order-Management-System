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

// for Role

export const createRole = (data) => {
  let url = `${Config.BaseUrl}auth1/role_permission/roleCreate`;
  return axios.post(url, data);
};
export const getAllRole = () => {
  let url = `${Config.BaseUrl}auth1/role_permission/getAllRoles`;
  return axios.get(url);
};
export const editRole = (id, data) => {
  let url = `${Config.BaseUrl}auth1/role_permission/${id}`;
  return axios.patch(url, data);
};
export const deleteRole = (id) => {
  let url = `${Config.BaseUrl}auth1/role_permission/${id}`;
  return axios.delete(url);
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

// export const uploadImage = () => {
//     let url = `${Config.BaseUrl}upload/file-service`;
//     return axios.post(url)
// }

// Order
// export const createOrder = (table) => {
//   let url = `${Config.BaseUrl}customer/orders`;
//   return axios.post(url, table);
// };

// add to cart
export const createCart = (data) => {
  let url = `${Config.BaseUrl}customer/orderDetail`;
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllCart = () => {
  let url = `${Config.BaseUrl}customer/orderDetail`;
  return axios.get(url);
};




  // for Permission
  

  export const createPermission = (data) => {
    let url = `${Config.BaseUrl}auth2/role_permission/permissionCreate`;
    return axios.post(url, data);
  };  
  export const getAllPermission = () => {
    let url = `${Config.BaseUrl}auth2/role_permission/getAllPermission`;
    return axios.get(url);
  };  
  export const editPermission = (id, data) => {
    let url = `${Config.BaseUrl}auth2/role_permission/${id}`;
    return axios.patch(url, data);
  };  
  export const deletePermission = (id) => {
    let url = `${Config.BaseUrl}auth2/role_permission/${id}`;
    return axios.delete(url);
  };import axios from 'axios';
import {Config} from "../Config";

// For registration

export const getAllUsers = () => {
    let url = `${Config.BaseUrl}api/register`;
    return axios.get(url);
}

export const getUser = (id) => {
    let url = `${Config.BaseUrl}api/register/${id}`;
    return axios.get(url);
}

export const createUser = (data) => {
    let url = `${Config.BaseUrl}api/register/`;
    return axios.post(url, data);
}

export const editUser = (id, data) => {
    let url = `${Config.BaseUrl}api/register/${id}`;
    return axios.patch(url, data);
}

export const deleteUser = (id) => {
    let url = `${Config.BaseUrl}api/register/${id}`;
    return axios.delete(url);
}


// for category 

export const createCategory = (data) => {
    let url = `${Config.BaseUrl}admin/category`;
    return axios.post(url, data);
}

export const getAllCategory = () => {
    let url = `${Config.BaseUrl}admin/category`;
    return axios.get(url);
}

export const editCategory = (id, data) => {
    let url = `${Config.BaseUrl}admin/category/${id}`;
    return axios.patch(url, data);
}

export const deleteCategory = (id) => {
    let url = `${Config.BaseUrl}admin/category/${id}`;
    return axios.delete(url);
}

// for Menu 

export const createMenu = (data) => {
    let url = `${Config.BaseUrl}admin/menu`;
    return axios.post(url,data);
}

export const getAllMenu = () => {
    let url = `${Config.BaseUrl}admin/menu`;
    return axios.get(url);
}

export const editMenu= (id, data) => {
    let url = `${Config.BaseUrl}admin/menu/${id}`;
    return axios.patch(url, data);
}

export const deleteMenu = (id) => {
    let url = `${Config.BaseUrl}admin/menu/${id}`;
    return axios.delete(url);
}


// for Role 

export const createRole = (data) => {
    let url = `${Config.BaseUrl}auth1/role_permission/roleCreate`;
    return axios.post(url, data);
}

export const getAllRole = () => {
    let url = `${Config.BaseUrl}auth1/role_permission/getAllRoles`;
    return axios.get(url);
}

export const editRole= (id, data) => {
    let url = `${Config.BaseUrl}auth1/role_permission/${id}`;
    return axios.patch(url, data);
}

export const deleteRole = (id) => {
    let url = `${Config.BaseUrl}auth1/role_permission/${id}`;
    return axios.delete(url);
}


// for Permission 

export const createPermission = (data) => {
    let url = `${Config.BaseUrl}auth2/role_permission/permissionCreate`;
    return axios.post(url, data);
}

export const getAllPermission = () => {
    let url = `${Config.BaseUrl}auth2/role_permission/getAllPermission`;
    return axios.get(url);
}

export const editPermission= (id, data) => {
    let url = `${Config.BaseUrl}auth2/role_permission/${id}`;
    return axios.patch(url, data);
}

export const deletePermission = (id) => {
    let url = `${Config.BaseUrl}auth2/role_permission/${id}`;
    return axios.delete(url);
}


// Profile Update
export const editProfile= (id, data) => {
    let url = `${Config.BaseUrl}change/profile/${id}`;
    return axios.patch(url, data);
}