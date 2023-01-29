import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default <T>(url: any, refetch: boolean) => {
    const axiosInstance = useAxios()
    const [comments, setComments] = useState<T>()
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const router = useRouter()


    useEffect(() => {
        if(!url) return

        const abortController = new AbortController()
        const signal = abortController.signal
        async function get() {
            
            try {
                setIsLoading(true)
                setError(false)
                setModal(false)
                const response = await axiosInstance.get(`comments/${url}`, {signal})
                setComments(response?.data)
                setIsLoading(false)
                return
            } catch (error: any) {
                setIsLoading(false)
                if(error?.response?.status === 401 || error?.response?.status === 403) {
                    // router.push('/login')
                    setModal(true)
                }
                else if(error?.name !== 'CanceledError') {
                    setError(true)
                }
                else return 
            }
        }
        get()
        return () => abortController.abort()
    }, [url, refetch])

    return { comments, error, isLoading, modal, setModal}

}