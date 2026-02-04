import axios from "axios";
const API = import.meta.env.VITE_REST_API_URL;
const REST_API_BASE_URL = `${API}/student`;

export const GetAllStudents = () => {
  return axios.get(REST_API_BASE_URL);
}

export const GetStudentById = (id) => {
  return axios.get(REST_API_BASE_URL + '/' + id);
}
export const DeleteStudentsByYear = (year) => {
  return axios.delete(`${REST_API_BASE_URL}/${year}`);
};