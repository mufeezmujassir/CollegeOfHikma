import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/about";

export const GetAllAbout = async()=>{
    return await axios.get(API_URL);
}

export  const DeleteAbout=async(id)=>{
    return await axios.delete(`${API_URL}/${id}`)
}

export const AddAbout = async (formdata) => {
    return axios.post(API_URL, formdata);
}

export const UpdateAbout = async (id, formdata) => {
    return axios.put(`${API_URL}/${id}`, formdata);
}
