import { useState } from "react"
import { commentInterface } from "./interfaces/commentInterface"
import EditForm from "./EditForm"
import Form from "./Form"
import { useContext } from "react"
import { TokenContext } from "./TokenProvider"
import RatingComponent from './RatingComponent'
import CommentMetadata from "./CommentMetadata"
import ActionButtons from './ActionButtons'

interface props {
    comment: commentInterface;
    parentId?: string;
    getComments? :() => void;
}

const Comment = ({comment, parentId, getComments}: props) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const user = useContext(TokenContext)?.user

    return (
        <div className="flex flex-col gap-5">
            {isEditing ? (
                <EditForm getComments={getComments} setIsEditing={setIsEditing} prevContent={comment.content} commentId={comment._id}/>
            ) : (
                <div className="p-4 bg-white w-full rounded-md grid gap-y-4">
                    <CommentMetadata comment={comment}/>
                    <div className="comment-content | text-[#67727e] font-light row-start-2 col-start-1 col-end-3"><p>{comment.replyingTo && <span className="text-teal-700">@{comment.replyingTo} </span>}{comment.content}</p></div>
                    <RatingComponent
                        comment={comment}
                        user={user}
                        getComments={getComments}
                    />
                    <ActionButtons 
                        commentUserId={comment.user?._id}
                        commentId={comment._id}
                        user={user} 
                        setIsReplying={setIsReplying} 
                        setIsEditing={setIsEditing}
                        getComments={getComments}    
                    />
                </div>
            )}
            {isReplying && comment?.user && <Form replyingTo={comment?.user?.login} parentId={parentId} getComments={getComments} setIsReplying={setIsReplying}/>}
        </div>
    )
}

export default Comment