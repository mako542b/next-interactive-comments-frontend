import CommentModule from "./CommentModule"
import { commentInterface } from "./interfaces/commentInterface"
import { sortByTimestamp } from '../controllers/formatTime'

interface propsInterface {
    comments: commentInterface[];
}

const Comments = ({ comments } : propsInterface) => {
    
    const originalComments = comments.filter(comment => !comment.parentId)
        .sort((a,b) => sortByTimestamp(a.createdOn, b.createdOn))

    const responses = (id: string) => {
        return comments.filter(comment => comment.parentId === id).sort((a,b) => sortByTimestamp(a.createdOn, b.createdOn))
    }

    return (
        <div className="w-[min(90%,40em)] mx-auto flex flex-col gap-8">
            {originalComments && originalComments.map(comm => (
                <CommentModule 
                    key={comm._id}
                    comment={comm} 
                    responses={responses(comm._id)} 
                />
            ))}
        </div>
    )
}

export default Comments