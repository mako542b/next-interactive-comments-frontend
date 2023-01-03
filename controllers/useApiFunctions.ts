import { MessageBody } from "../components/interfaces/MessageBody";
import { ratingInterface } from '../components/interfaces/commentInterface'
import useAxios from "../hooks/useAxios";


const useApiFunctions = () => {
    const axiosInstance = useAxios()

    async function createComment(body: MessageBody) {
        const response = await axiosInstance.post('comments/create', body)
        return response.data
    }

    async function handleRatingApi(commentId: string, rating: ratingInterface) {
        const body = {
            commentId,
            rating
          }
        const response = await axiosInstance.patch('comments/rating', body )
        return response.data
    }

    
    async function deleteCommentApi(id:string) {
        const comment = await axiosInstance.delete(`comments/${id}`)
        return comment.data
    }
    
    async function editCommentApi(id: string, newContent: string) {
        const editedComment = await axiosInstance.patch(`comments/${id}`, {newContent})
        return editedComment.data
    }

    return {createComment, handleRatingApi, deleteCommentApi, editCommentApi}

}

export default useApiFunctions

