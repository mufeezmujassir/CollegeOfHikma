import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/auth/subject";

export const GetAllSubjects=()=>{
    return axios.get(REST_API_BASE_URL);
}

export const GetSubjectById=(id)=>{
    return axios.get(REST_API_BASE_URL + '/' + id);
}