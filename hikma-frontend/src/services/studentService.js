import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/auth/student";

export const GetAllStudents=()=>{
    return axios.get(REST_API_BASE_URL);
}

export const GetStudentById=(id)=>{
    return axios.get(REST_API_BASE_URL + '/' + id);
}
export const DeleteStudentsByYear = (year) => {
  return axios.delete(`${REST_API_BASE_URL}/${year}`);
};