import axios from "axios";
const API = import.meta.env.VITE_REST_API_URL;
const REST_API_BASE_URL = `${API}/subject`;

export const GetAllSubjects = () => {
    return axios.get(REST_API_BASE_URL);
}

export const GetSubjectById = (id) => {
    return axios.get(REST_API_BASE_URL + '/' + id);
}