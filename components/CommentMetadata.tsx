import { commentInterface } from "./interfaces/commentInterface"
import { formatTime } from "../controllers/formatTime"

interface props {
    comment: commentInterface;
}

const CommentMetadata = ({ comment }: props) => {
    return (
        <div className="comment-metadata | flex gap-3 place-items-center row-start-1">
            <div className="max-h-10 aspect-square">
                <img src={`/avatars/${comment?.user?.avatar}`} alt="" />
            </div>
            <p className="text-[#324152]">{comment?.user ? comment?.user?.login : 'user deleted'}</p>
            <p className="text-[#67727e]">{formatTime(comment.createdOn)}</p>
        </div>
    )
}


export default CommentMetadata