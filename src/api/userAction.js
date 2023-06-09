import axios from 'axios';
import {Config} from "../Config";

// For registration

export const getAllUsers = () => {
    let url = `${Config.BaseUrl}api/register`;
    return axios.get(url);
}

export const getUser = (id) => {
    let url = `${Config.BaseUrl}users/${id}`;
    return axios.get(url);
}

export const createUser = (data) => {
    let url = `${Config.BaseUrl}api/register/`;
    return axios.post(url, data);
}

export const editUser = (id, data) => {
    let url = `${Config.BaseUrl}users/${id}`;
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


// for Menu 

export const createMenu = (data) => {
    let url = `${Config.BaseUrl}admin/menu`;
    return axios.post(url, data);
}

export const getAllMenu = () => {
    let url = `${Config.BaseUrl}admin/menu`;
    return axios.get(url);
}


// for Role 

export const createRole = (data) => {
    let url = `${Config.BaseUrl}auth/role`;
    return axios.post(url, data);
}

export const getAllRole = () => {
    let url = `${Config.BaseUrl}auth/role`;
    return axios.get(url);
}


// for Permission 

export const createPermission = (data) => {
    let url = `${Config.BaseUrl}auth/permission`;
    return axios.post(url, data);
}

export const getAllPermission = () => {
    let url = `${Config.BaseUrl}auth/permission`;
    return axios.get(url);
}