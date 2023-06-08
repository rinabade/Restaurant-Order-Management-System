import axios from 'axios';
import {Config} from "../Config";

export const loginUser = (data) => {
    let url = `${Config.BaseUrl}/api/login`;
    return axios.post(url, data)
        .then(
            response => {
                return response
            },
            error => {
                return error
            }
        )
}

export const registerUser = (data) => {
    let url = `${Config.BaseUrl}/api/register/create`;
    return axios.post(url, data)
        .then(
            response => {
                return response
            },
            error => {
                return error
            }
        )
}

export const updateUser = (id, data) => {
    let url = `${Config.BaseUrl}/api/register/${id}`;
    return axios.patch(url, data)
        .then(
            response => {
                return response
            },
            error => {
                return error
            }
        )
}