import axios from "axios";

const REST_API_URL="http://localhost:8080/api/auth/news";

export const GetAllNews=async()=>{
    return await axios.get(REST_API_URL);
}
export const AddNews=async(formdata)=>{
    return await axios.post(REST_API_URL,formdata,{
        headers:{'Content-Type':'multipart/form-data'}
    }
    );
}

export const DeleteNews=async(id)=>{
    return await axios.delete(`${REST_API_URL}/${id}`)
}

export const UpdateNews = async (id, formdata) => {
  return await axios.put(`${REST_API_URL}/${id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });
};

