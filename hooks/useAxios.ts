import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { TokenContext } from "../components/TokenProvider";

const useAxios = () => {


    const context = useContext(TokenContext)
    const setJWT = context?.setJWT
    
    const {current: axiosInstance} = useRef(
        axios.create({
            baseURL: 'http://localhost:3500',
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
    )


    const axiosNormal = axios.create({
        baseURL: 'http://localhost:3500',
        headers: { 'Content-Type': 'application/json' },
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
                        setJWT?.(refreshToken.data.access_token)

                        const user = await axiosNormal.get('auth/profile',{
                            headers: { 
                                'Content-Type': 'application/json',
                                'Authorization' : `Bearer ${refreshToken.data.access_token}`,
                            },
                        })
                        context?.setUser?.(user?.data)
                        prevReq.headers.Authorization = `Bearer ${refreshToken.data.access_token}`
                        return axiosInstance(prevReq);
                        
                    } catch (error) {
                        return Promise.reject(error)
                    }
                }
                return Promise.reject(error)
            }
        )
       return () => {
        axiosInstance.interceptors.response.eject(responseInterceptor)
        }
    },[axiosInstance])

    return axiosInstance
}

export default useAxios