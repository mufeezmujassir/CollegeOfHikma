import axios from 'axios';

const API = import.meta.env.VITE_REST_API_URL;
const RESTAPIBASEURL = `${API}/hero`;

export const AddHeroSlide = (formdata) => {
    return axios.post(RESTAPIBASEURL, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export const GetAllHeroSlide = () => {
    return axios.get(RESTAPIBASEURL);
}


export const DeleteHeroSlide = (id) => {
    axios.delete(`${RESTAPIBASEURL}/${id}`);
}

export const UpdateHeroSlide = (id, formdata) => {
    return axios.put(`${RESTAPIBASEURL}/${id}`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}