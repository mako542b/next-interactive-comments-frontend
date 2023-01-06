import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default <T>(url: any, refetch: boolean) => {
    const [comments, setComments] = useState<T>()
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const axiosInstance = useAxios()

    useEffect(() => {
        if(!url) return
        const abortController = new AbortController()
        const signal = abortController.signal
        const get = async () => {
            try {
                setIsLoading(true)
                setError(false)
                const response = await axiosInstance.get(`comments/${url}`, {signal})
                setComments(response?.data)
                setIsLoading(false)
                return
            } catch (error: any) {
                setIsLoading(false)
                if(error?.name !== 'CanceledError') {
                    setError(true)
                    console.log(error)
                }
                return 
            }
        }
        get()
        return () => abortController.abort()
    }, [refetch, url])

    return { comments, error, isLoading }

}