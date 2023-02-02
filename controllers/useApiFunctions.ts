import { MessageBody } from "../components/interfaces/MessageBody";
import { ratingInterface } from '../components/interfaces/commentInterface'
import useAxios from "../hooks/useAxios"
import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction, useContext } from "react";
import { TokenContext } from "../components/TokenProvider";



export default function useApiFunctions() {

    const context = useContext(TokenContext)
    const modal = context?.modal as boolean
    const setModal = context?.setModal as Dispatch<SetStateAction<boolean>>
    const axiosInstance = useAxios()
    const setRefetch = context?.setRefetch as Dispatch<SetStateAction<boolean>>



    async function createComment(body: MessageBody) {
        try {
            const response = await axiosInstance.post('comments/create', body)
            setRefetch(prev => !prev)
            return response
        } catch (error) {
            handleError(error)
        }
    }

    async function handleRatingApi(commentId: string, rating: ratingInterface) {
        try {
            const body = { commentId, rating }
            const response = await axiosInstance.patch('comments/rating', body )
            setRefetch(prev => !prev)
            return response
        } catch (error) {
            handleError(error)
        }
    }

    
    async function deleteCommentApi(id:string) {
        try {
            const comment = await axiosInstance.delete(`comments/${id}`)
            setRefetch(prev => !prev)
            return comment
        } catch (error) {
            handleError(error)
        }
    }
    
    async function editCommentApi(id: string, newContent: string) {
        try {
            const editedComment = await axiosInstance.patch(`comments/${id}`, {newContent})
            setRefetch(prev => !prev)
            return editedComment
        } catch (error) {
            handleError(error)
        }
    }

    function handleError(error: any) {
        if(error.response?.status === 401) {
            setModal(true)
            return {error: 'timeout'}
        }
        else return null
    }



    return { createComment, handleRatingApi, deleteCommentApi, editCommentApi }
}

