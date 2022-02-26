import axios from 'axios';
import { AUTH } from '../../constants/api';

export async function login({ email, password }) {
    var from = new FormData();
    from.append("email", email);
    from.append("password", password);
    try {
        console.log(AUTH);
        const res = await axios.post(AUTH, from,
            );
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}