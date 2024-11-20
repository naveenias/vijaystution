import axios from 'axios';


export const axiosInstance =axios.create({
    baseURL: 'https://vjsmukyapranastudyzonebackend.vercel.app',
    // baseURL:"http://localhost:8000/",
    headers : {
        authorization : `Bearer ${localStorage.getItem("token")}`
    },
})
