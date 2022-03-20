import axios from "axios";
import { INVENTORY } from "../../constants/api";
import { getUserToken } from "../../utils/sessionManager";

const access_token = getUserToken();

export async function addItem(payload){
    try {
        const res = await axios.post(INVENTORY+ '/register', payload, {
            headers: {
                'access_token': access_token
            }
        });
        return res;
    } catch (err) {
        return err;
    }
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
        const res = await axios.get(`${INVENTORY}`, {
            headers: {
                'access_token': access_token
            }
        });
        return res;
    } catch (err) {
        console.error(err);
    }
}