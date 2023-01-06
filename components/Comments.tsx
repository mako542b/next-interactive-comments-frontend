import CommentModule from "./CommentModule"
import { commentInterface } from "./interfaces/commentInterface"

interface propsInterface {
    comments: commentInterface[];
    getComments? :() => void;
}

const Comments = ({comments, getComments} : propsInterface) => {
    const originalComments = comments.filter(comment => comment.parentId === null)
    const responses = (id: string) => {
        return comments.filter(comment => comment.parentId === id).sort((a,b) => a.createdOn < b.createdOn ? -1 : 1)
    }

    return (
        <div className="w-[min(90%,40em)] mx-auto flex flex-col gap-8">
            {originalComments && originalComments.map(comm => (
                <CommentModule 
                    key={comm._id}
                    comment={comm} 
                    responses={responses(comm._id)} 
                    getComments={getComments}
                />
            ))}
        </div>
    )
}

export default Comments