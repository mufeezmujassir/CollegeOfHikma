import axios from "axios";
const API = import.meta.env.VITE_REST_API_URL;

const API_URL = `${API}`;


export const loginAdmin = (email, password) => {
    return axios.post(`${API_URL}/login`, {
        email,
        password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};
