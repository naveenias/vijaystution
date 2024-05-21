import { axiosInstance } from "./axiosInstance";

export const AddStu = async (payload) => {
  try {
    let res = await axiosInstance.post("/api/students/addstudent", payload);
    return res.data;
  }catch{
    return console.error("error");;
  }
  }


export  const GETStu = async () => {
    try {
      let res = await axiosInstance.get("/api/students/getStudent");
      return res.data;
    } catch (error) {
      return console.error("error");
    }
  };


  export const Loginstudent = async (payload) => {
    try {
      const response =axiosInstance.post("/api/students/loginstudent",payload);
     
      return response;
      
    }catch(error){
       console.error("log in error api")
    }
  }


  export const GETStubynumber = async (payload) => {
   
    try {
      let res = await axiosInstance.post("/api/students/getStudentbynumber", payload);
      return res.data;
    } catch (error) {
      return console.error("error");
    }
  };


  export const GETStubyid = async (payload) => {
   
    try {
      let res = await axiosInstance.post("/api/students/getStudentbyid", payload);
      return res.data;
    } catch (error) {
      return console.error("error");
    }
  };


  export const Deletestudentbyid = async (payload) => {
    try {
      let res = await axiosInstance.post("/api/students/deletestud", payload);
      return res.data;
    } catch (error) {
      return console.error("error");
    }
  };


  export const updatestudent = async (payload) => {
    try {
      let res = await axiosInstance.put("/api/students/updateStudentbyid", payload);
      return res;
    } catch (error) {
      return console.error("error");
    }
  };