import { axiosInstance } from "../api/axios";
import { useContext, useEffect } from "react";
import { TokenContext } from "../components/TokenProvider";
import useRefreshToken from "./useRefreshToken";

const useAxios = () => {
    
    const context = useContext(TokenContext)
    axiosInstance.defaults.headers.Authorization = `Bearer ${context?.JTW}`

    const refresh = useRefreshToken()

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config
                if(!prevReq.sent) {
                    prevReq.sent = true
                    const refreshToken = await refresh()
                    prevReq.headers.Authorization = `Bearer ${refreshToken}`
                    return axiosInstance(prevReq);
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