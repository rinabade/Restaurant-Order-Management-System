import axios from 'axios';
import {Config} from "../Config";

export const loginUser = (credentials) => {
    let url = `${Config.BaseUrl}api/login`;
    return axios.post(url, credentials,{
        headers: {
            'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token.data.token}`,
          // other headers if needed
        },
        body: JSON.stringify(credentials)
    })
       
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

export const forgetPassword = ( data) => {
    let url = `${Config.BaseUrl}forget/forget`;
    return axios.post(url, data)
        // .then(
        //     response => {
        //         return response
        //     },
        //     error => {
        //         return error
        //     }
        // )
}

export const resetPassword = ( data,email) => {
    let url = `${Config.BaseUrl}forget/reset/${email}`;
    return axios.patch(url, data,email)
        
}


// export const loginUser = ({email,password}) => {
//     let url = `${Config.BaseUrl}/api/login`;
//     return axios.post(url, JSON.stringify({email,password}),{
//         headers: {
//             'Content-Type': 'application/json',
//             withCredentials: true
//           },
//         //   body: JSON.stringify(credentials)

//     })
//           .then(data => data.json())
    
//         .then(
//             response => {
//                 // return response
//             console.log(response.data);

//             })
//             .catch((error) => {
//                 // return error
//             console.error(error);

//             });

// }