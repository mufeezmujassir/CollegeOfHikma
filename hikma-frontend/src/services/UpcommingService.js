import axios from "axios";

const REST_API_URL='http://localhost:8080/api/auth/event'

export const GetAllUpcomming=async()=>{
    return await axios.get(REST_API_URL);
}

export const AddUpcomming=async(formdata)=>{
    return await axios.post(REST_API_URL,formdata, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export const UpdateUpcomming=async(id,formdata)=>{
    return await axios.put(`${REST_API_URL}/${id}`,formdata, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export const DeleteUpcomming=async(id)=>{
    return await axios.delete(`${REST_API_URL}/${id}`)
}