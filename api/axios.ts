import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3500',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export default axios.create({
    baseURL: 'http://localhost:3500',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})