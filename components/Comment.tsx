import { useState } from "react"
import { commentInterface } from "./interfaces/commentInterface"
import EditForm from "./EditForm"
import Form from "./Form"
import { useContext } from "react"
import { TokenContext } from "./TokenProvider"
import useApiFunctions from "../controllers/useApiFunctions"
import RatingComponent from './RatingComponent'
import CommentMetadata from "./CommentMetadata"

interface props {
    comment: commentInterface;
    parentId?: string;
    getComments? :() => void;
}

const Comment = ({comment, parentId, getComments}: props) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const context = useContext(TokenContext)
    const user = context?.user
    const isOp = user?._id === comment?.user?._id
    const { deleteCommentApi } = useApiFunctions()

    async function handleDelete(){
        if(!window.confirm('Are you sure you want to delete comment?')) return
        try {
            const deletedComment = await deleteCommentApi(comment._id)
            getComments?.()
            return deletedComment
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="p-4 bg-white w-full rounded-md grid gap-y-4">
                {isEditing ? (
                    <EditForm getComments={getComments} setIsEditing={setIsEditing} prevContent={comment.content} commentId={comment._id}/>
                ) : (
                    <>
                        <CommentMetadata comment={comment}/>
                        <div className="comment-content | text-[#67727e] font-light row-start-2 col-start-1 col-end-3"><p>{comment.replyingTo && <span className="text-teal-700">@{comment.replyingTo} </span>}{comment.content}</p></div>
                        
                        <RatingComponent
                            comment={comment}
                            user={user}
                            getComments={getComments}

                        />

                        <div className="comment-action | flex gap-5 row-start-4 md:row-start-3 md:ml-auto">
                            {user &&<button onClick={() => setIsReplying(prev => !prev)} className="flex gap-1 items-center text-[#5357B6]"><img className="max-h-4" src="/smallSvg/icon-reply.svg" alt="" /> Reply</button>}
                            {isOp && <button onClick={handleDelete} className="flex gap-1 items-center text-[#ED6368]"><img className="max-h-4" src="/smallSvg/icon-delete.svg" alt="" /> Delete</button>}
                            {isOp && <button onClick={() => setIsEditing(prev => !prev)} className="flex gap-1 items-center text-[#5357B6]"><img className="max-h-4" src="/smallSvg/icon-edit.svg" alt="" /> Edit</button>}
                        </div>
                    </>
                )}
            </div>
            {isReplying && comment?.user && <Form replyingTo={comment?.user?.login} parentId={parentId} getComments={getComments} setIsReplying={setIsReplying}/>}
        </div>
    )
}

export default Comment