import axios from "axios";
const API = import.meta.env.VITE_REST_API_URL;
const REST_API_URL = `${API}/message`;



export const GetAllMessage = async () => {
    return await axios.get(REST_API_URL);

}

export const AddMessage = async (formdata) => {
    return await axios.post(REST_API_URL, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    );
}

export const DeleteMessage = async (id) => {
    return await axios.delete(`${REST_API_URL}/${id}`)
}

export const UpdateMessage = async (id, formdata) => {
    return await axios.put(`${REST_API_URL}/${id}`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}
