import { axiosInstance } from "./axiosInstance";




export const sendsms = async (payload) => {
    try {
      
      let res = await axiosInstance.post("/api/sendsms/sendtext", payload);
      return res;
    }catch{
      return console.error("error");
    }
    }