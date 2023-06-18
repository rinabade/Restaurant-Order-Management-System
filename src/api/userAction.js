import axios from 'axios';
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