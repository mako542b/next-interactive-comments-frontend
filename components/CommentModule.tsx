import { commentInterface } from "./interfaces/commentInterface"
import Comment from "./Comment"
import { useState } from "react"


interface props {
    comment: commentInterface
}

const CommentModule = ({comment} : props) => {

    const [hidden, setHidden] = useState<boolean>(false)
    const buttonLabel = hidden ? `show ${comment.responses?.length} ` : 'hide '
    
    return (
        <div className="grid gap-3">
            <Comment comment={comment}/>
            {comment.responses && comment.responses.length > 0 && (
                <div className="relative w-[90%] ml-auto after:absolute after:inset-y-0 after:w-[1px] after:bg-[hsla(0,0%,83%,.65)] after:-left-[10%] grid gap-4">
                    <button className="ml-auto" onClick={() => setHidden(prev => !prev)}>{buttonLabel}replies</button>
                    {!hidden && comment.responses.map(resp => (
                        <Comment comment={resp}/>
                    ))}
                </div>)}
        </div>
    )
}

export default CommentModule