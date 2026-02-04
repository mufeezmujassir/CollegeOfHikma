import axios from "axios";
const API = import.meta.env.VITE_REST_API_URL;
const API_URL = `${API}/about`;

export const GetAllAbout = async () => {
    return await axios.get(API_URL);
}

export const DeleteAbout = async (id) => {
    return await axios.delete(`${API_URL}/${id}`)
}

export const AddAbout = async (formdata) => {
    return axios.post(API_URL, formdata);
}

export const UpdateAbout = async (id, formdata) => {
    return axios.put(`${API_URL}/${id}`, formdata);
}
