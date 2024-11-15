import axios from 'axios';


export const axiosInstance =axios.create({
    baseURL: 'https://vjsmukyapranastudyzonebackend.vercel.app',
    headers : {
        authorization : `Bearer ${localStorage.getItem("token")}`
    },
})
