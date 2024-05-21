import { axiosInstance } from "./axiosInstance";




export const sendsms = async (payload) => {
    try {
      console.log(payload)
      let res = await axiosInstance.post("/api/sendsms/sendtext", payload);
      console.log(res)

      return res;
    }catch{
      return console.error("error");
    }
    }