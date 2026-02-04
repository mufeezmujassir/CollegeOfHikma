import axios from "axios";

const API = import.meta.env.VITE_REST_API_URL;
const REST_API_URL = `${API}/event`;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  };
};

export const GetAllUpcomming = async () => {
  return await axios.get(REST_API_URL);
};

export const AddUpcomming = async (formdata) => {
  return await axios.post(REST_API_URL, formdata, getAuthHeaders());
};

export const UpdateUpcomming = async (id, formdata) => {
  return await axios.put(`${REST_API_URL}/${id}`, formdata, getAuthHeaders());
};

export const DeleteUpcomming = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${REST_API_URL}/${id}`, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
};