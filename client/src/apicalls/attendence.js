
import { axiosInstance } from "./axiosInstance";



export const Addattendence = async (payload) => {
    try {
      let res = await axiosInstance.post("/api/attendence/addattendence", payload);
      return res.data;
    }catch{
      return console.error("error");
    }
};


export  const GETattendence = async () => {
    try {
      let res = await axiosInstance.get("/api/attendence/getattendence");
      return res.data;
    } catch (error) {
      return console.error("error");
    }
  };
