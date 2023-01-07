import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default <T>(url: any, refetch: boolean) => {
    const axiosInstance = useAxios()
    const [comments, setComments] = useState<T>()
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if(!url) return

        const abortController = new AbortController()
        const signal = abortController.signal
        async function get() {
            
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
                }
                return 
            }
        }
        get()
        return () => abortController.abort()
    }, [url, refetch])

    return { comments, error, isLoading }

}