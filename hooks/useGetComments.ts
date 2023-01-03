import { useCallback, useEffect, useState } from "react";
import useAxios from "./useAxios";
// import { useWhatChanged } from '@simbathesailor/use-what-changed';

export default <T>(url: string, refetch: boolean) => {
    const [comments, setComments] = useState<T>()
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const axiosInstance = useAxios()

    // let deps = [url, refetch]

    // useWhatChanged(deps, 'url, refetch, axiosInstance');

    // useEffect(() => {
    //     const abortController = new AbortController()
    //     const signal = abortController.signal
    //     const get = async () => {
    //         try {
    //             setIsLoading(true)
    //             setError(false)
    //             const response = await axiosInstance.get(url, {signal})
    //             setComments(response?.data)
    //             setIsLoading(false)
    //             return
    //         } catch (error) {
    //             console.log(error)
    //             setIsLoading(false)
    //             setError(true)
    //             return 
    //         }
    //       }
    //     get()
    //     return () => abortController.abort()
    // }, [url, refetch])

const getComments = useCallback(() => {
      const get = async () => {
        try {
            setIsLoading(true)
            setError(false)
            const response = await axiosInstance.get(url)
            setComments(response?.data)
            setIsLoading(false)
            return
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError(true)
            return 
        }
      }
      get()
    },[url, axiosInstance])

    useEffect(() => {
      getComments()
    },[getComments])

    return { comments, error, isLoading }

}