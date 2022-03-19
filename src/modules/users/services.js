import axios from 'axios';
import { USER, AUTH } from '../../constants/api';
import {logoutUser, getUserToken, saveUser, saveUserPermissions, saveUserToken } from '../../utils/sessionManager';

const access_token = getUserToken();
export async function login(payload) {
    return new Promise((resolve, reject) => {
        axios.post(AUTH, payload)
            .then((res) => {
                saveUser(res.data.user);
                saveUserToken(res.data.token);
                saveUserPermissions(res.data.permissions);
                resolve({sucess: true, status: 200})
            }).catch((err)=>{
                reject(err.response.data);
            });
    });
}
export async function logout() {
    logoutUser();
}
export async function verifyToken(token) {
    try {
        const res = await axios.get(`${AUTH}/${token}`);
        return res;
    } catch (err) {
        console.error(err);
    }
}

export async function addUser(payload) {
    try {
        const res = await axios.post(USER + '/register', payload, {
            headers: {
                'access_token': access_token
            }
        });
        return res;
    } catch (err) {
        console.error(err);
    }
}

export async function getAllUser(payload) {
    try {
        const res = await axios.get(USER, payload, {
            headers: {
                'access_token': access_token
            }
        });
        return res;
    } catch (err) {
        console.error(err);
    }
}