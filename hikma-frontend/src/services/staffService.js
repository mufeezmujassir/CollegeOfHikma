import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/auth/staff';

export const AddStaff = (formData) =>
  axios.post(REST_API_BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const GetAllStaff = () =>
  axios.get(REST_API_BASE_URL);

export const DeleteStaff = (staffId) =>
  axios.delete(`${REST_API_BASE_URL}/${staffId}`);

export const UpdateStaff = (id, data) => {
  return axios.put(`${REST_API_BASE_URL}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};