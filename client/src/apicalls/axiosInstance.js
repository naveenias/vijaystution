import axios from 'axios';


export const axiosInstance =axios.create({
    baseURL: 'https://naveenstutionbackend.vercel.app/',
    headers : {
        authorization : `Bearer ${localStorage.getItem("token")}`
    },
})