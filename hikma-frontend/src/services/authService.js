import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

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
