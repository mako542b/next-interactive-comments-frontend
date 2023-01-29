import { MessageBody } from "../components/interfaces/MessageBody";
import { ratingInterface } from '../components/interfaces/commentInterface'
import useAxios from "../hooks/useAxios"
import {AxiosInstance} from "axios";


class ApiFunctions  {

    constructor(private axiosInstance: AxiosInstance) {}

    async createComment(body: MessageBody) {
        const response = await this.axiosInstance.post('comments/create', body)
        return response.data
    }

    async handleRatingApi(commentId: string, rating: ratingInterface) {
        const body = {
            commentId,
            rating
          }
        const response = await this.axiosInstance.patch('comments/rating', body )
        return response.data
    }

    
    async deleteCommentApi(id:string) {
        const comment = await this.axiosInstance.delete(`comments/${id}`)
        return comment.data
    }
    
    async editCommentApi(id: string, newContent: string) {
        const editedComment = await this.axiosInstance.patch(`comments/${id}`, {newContent})
        return editedComment.data
    }
}

// export default ApiFunctions

export default function useApiFunctions() {
    const axiosInstance = useAxios()
    const apiFunctions = new ApiFunctions(axiosInstance)
    return apiFunctions
}

