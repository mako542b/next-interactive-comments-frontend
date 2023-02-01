import { Dispatch, SetStateAction } from "react";
import useApiFunctions from "../controllers/useApiFunctions"


interface props {
    user: any;
    commentUserId?: string;
    commentId: string;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    setIsReplying: Dispatch<SetStateAction<boolean>>;
}


const ActionButtons = ({ 
    user, 
    commentUserId, 
    setIsEditing, 
    setIsReplying,
    commentId,
}: props) => {

    const { deleteCommentApi } = useApiFunctions()
    const isOp = user?._id === commentUserId

    return (
        <div className="comment-action | flex gap-5 row-start-4 md:row-start-3 md:ml-auto">
            {user &&<button onClick={() => setIsReplying(prev => !prev)} className="flex gap-1 items-center text-[#5357B6]"><img className="max-h-4" src="/smallSvg/icon-reply.svg" alt="" /> Reply</button>}
            {isOp && <button onClick={handleDelete} className="flex gap-1 items-center text-[#ED6368]"><img className="max-h-4" src="/smallSvg/icon-delete.svg" alt="" /> Delete</button>}
            {isOp && <button onClick={() => setIsEditing(prev => !prev)} className="flex gap-1 items-center text-[#5357B6]"><img className="max-h-4" src="/smallSvg/icon-edit.svg" alt="" /> Edit</button>}
        </div>
    )

    async function handleDelete(){
        if(!window.confirm('Are you sure you want to delete comment?') ) return
            const response = await deleteCommentApi(commentId)
            return response
    }
}

export default ActionButtons