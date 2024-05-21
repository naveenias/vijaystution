import { axiosInstance } from "./axiosInstance";



export const Adduser = async (payload) => {
    try {
      let res = await axiosInstance.post("/api/users/adduser", payload);
      
      return res.data;
    }catch{
      return console.error("error");
    }
};


export  const GETuser = async () => {
    try {
        let res = await axiosInstance.get("/api/users/getuser");
          return res.data;
    } catch (error) {
          return console.error("error");
    }
};

export const LoginUser = async (payload) => {
  try {
    const response =axiosInstance.post("/api/users/loginadmin",payload);
    return response;
    
  }catch(error){
     console.error("log in error api")
  }
}


