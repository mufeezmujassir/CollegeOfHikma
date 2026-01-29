import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/auth/result";

export const GetAllResult=()=>{
    return axios.get(REST_API_BASE_URL);
}

export const AddResult=(formdata)=>{
    return axios.post(REST_API_BASE_URL,formdata);
}   

