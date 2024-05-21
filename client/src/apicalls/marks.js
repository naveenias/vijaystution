
import { axiosInstance } from "./axiosInstance";



export const Addmarks = async (payload) => {
    try {
      let res = await axiosInstance.post("/api/marks/addmarks", payload);
      return res.data;
    }catch{
      return console.error("error");
    }
};


export  const GETmarks = async (payload) => {
    try {
      let res = await axiosInstance.post("/api/marks/getmarks", payload);
      return res.data;
    } catch (error) {
      return console.error("error");
    }
  };
