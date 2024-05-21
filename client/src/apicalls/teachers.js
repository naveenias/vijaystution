import { axiosInstance } from "./axiosInstance";

export const Addteacher = async (payload) => {
  try {
    let res = await axiosInstance.post("/api/teachers/addteacher", payload);
    return res.data;
  }catch{
    return console.error("error");;
  }
  }


export  const GETteacher = async () => {
    try {
      let res = await axiosInstance.get("/api/teachers/getteacher");
      return res.data;
    } catch (error) {
      return console.error("error");
    }
  };
  
