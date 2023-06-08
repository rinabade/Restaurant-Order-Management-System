import axios from 'axios';
import {Config} from "../Config";

export const getAllUsers = () => {
    let url = `${Config.BaseUrl}/api/register`;
    return axios.get(url);
}

export const getUser = (id) => {
    let url = `${Config.BaseUrl}/users/${id}`;
    return axios.get(url);
}

export const createUser = (data) => {
    let url = `${Config.BaseUrl}/api/register/`;
    return axios.post(url, data);
}

export const editUser = (id, data) => {
    let url = `${Config.BaseUrl}/users/${id}`;
    return axios.patch(url, data);
}

export const deleteUser = (id) => {
    let url = `${Config.BaseUrl}/api/register/${id}`;
    return axios.delete(url);
}