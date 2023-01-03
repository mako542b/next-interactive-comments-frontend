import axios from "axios";
import { useEffect } from "react";
// import useAuthContext from "./useAuthContext";
import { useContext } from "react";
import { TokenContext } from "../components/TokenProvider";

const useAxios = () => {

    const context = useContext(TokenContext)
    const setJWT = context?.setJWT
    
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3500',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    const axiosNormal = axios.create({
        baseURL: 'http://localhost:3500',
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })



    axiosInstance.defaults.headers.Authorization = `Bearer ${context?.JTW}`

    useEffect(() => {

        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config
                if(!prevReq.sent) {
                    prevReq.sent = true
                    try {
                        const refreshToken = await axiosNormal.get('auth/refresh')
                        if (setJWT) setJWT(refreshToken.data.access_token)

                        const user = await axiosNormal.get('auth/profile',{
                            headers: { 
                                'Content-Type': 'application/json',
                                'Authorization' : `Bearer ${refreshToken.data.access_token}`,
                            },
                        })
                        if(context?.setUser) context.setUser(user.data)

                        return axiosInstance(prevReq);
                        
                    } catch (error) {
                        return Promise.reject(error)
                    }
                }
                return
            }
        )
       return () => {
        axiosInstance.interceptors.response.eject(responseInterceptor) 
        // axiosInstance.interceptors.response.eject(requestInterceptor) 
        }
    },[])

    return axiosInstance
}

export default useAxios