import axios from "axios";
import { INVENTORY, INVOICE } from "../../constants/api";
import { getUserToken } from "../../utils/sessionManager";

const access_token = getUserToken();

export async function addItem(payload){
    return new Promise((resolve, reject) => {
        axios.post(INVENTORY+ '/register', payload,{
            headers: {
                'access_token': access_token
            }
        })
            .then((res) => {
                resolve({sucess: true, status: 200, data: res.data})
            }).catch((err)=>{
                reject({success: false, status: 400, data: err.response.data.message});
            });
    });
}

export async function createInvoice(payload){
    return new Promise((resolve, reject) => {
        axios.post(INVOICE+ '/register', payload,{
            headers: {
                'access_token': access_token
            }
        })
            .then((res) => {
                resolve({sucess: true, status: 200, data: res.data})
            }).catch((err)=>{
                reject({success: false, status: 400, data: err.response.data.message});
            });
    });
}

export async function addToInvoice(invoice_id, payload){
    return new Promise((resolve, reject) => {
        axios.post(INVOICE+`/${invoice_id}` , payload,{
            headers: {
                'access_token': access_token
            }
        })
            .then((res) => {
                resolve({sucess: true, status: 200, data: res.data})
            }).catch((err)=>{
                reject({success: false, status: 400, data: err.response.data.message});
            });
    });
}

export async function deleteItem(id) {
    try {
        const res = await axios.delete(`${INVENTORY}/${id}`, {
            headers: {
                'access_token': access_token
            }
        });
        return res;
    } catch (err) {
        console.error(err);
    }
}

export async function getAllItem() {
    try {
        const res = await axios.get(`${INVENTORY}`, {headers:{'access_token':access_token}});
        return res.data.data;
    } catch (err) {
        console.error(err);
    }
}