import axios from "axios";
import { INVOICE } from "../../../constants/api";
import { getUserToken } from "../../../utils/sessionManager";

const access_token = getUserToken();

export async function getAllInvoice() {
    try {
        const res = await axios.get(`${INVOICE}`, {headers:{'access_token':access_token}});
        return res.data;
    } catch (err) {
        console.error(err);
    }
}