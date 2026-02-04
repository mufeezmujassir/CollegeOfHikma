import axios from "axios";
const API = import.meta.env.VITE_REST_API_URL;
const REST_API_BASE_URL = `${API}/result`;

export const GetAllResult = () => {
    return axios.get(REST_API_BASE_URL);
}

export const AddResult = (formdata) => {
    return axios.post(REST_API_BASE_URL, formdata);
}

