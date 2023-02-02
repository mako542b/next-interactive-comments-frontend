import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useContext } from "react";
import { TokenContext } from "../components/TokenProvider";

export default <T>(url: any) => {
    const axiosInstance = useAxios()
    const [comments, setComments] = useState<T>()
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const context = useContext(TokenContext)

    const modal = context?.modal as boolean
    const setModal = context?.setModal as Dispatch<SetStateAction<boolean>>
    
    const setRefetch = context?.setRefetch as Dispatch<SetStateAction<boolean>>
    const refetch = context?.refetch as boolean

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
                if(error?.response?.status === 401 ) {
                    context?.setUser(null)
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


    return { comments, error, isLoading, modal, setModal, refetch, setRefetch }

}