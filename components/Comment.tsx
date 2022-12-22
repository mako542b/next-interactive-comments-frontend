import { useState } from "react"
import { commentInterface } from "./interfaces/commentInterface"
import EditForm from "./EditForm"
import Form from "./Form"

interface props {
    comment: commentInterface,
}



const Comment = ({comment}: props) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isReplying, setIsReplying] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-5">
            <div className="p-4 bg-white w-full rounded-md grid gap-y-4">
                {isEditing ? (
                    <EditForm setIsEditing={setIsEditing} prevContent={comment.content}/>
                ) : (
                <>
                    <div className="comment-metadata | flex gap-3 place-items-center row-start-1">
                        <div className="max-h-10 aspect-square">
                            <img src={comment.img} alt="" />
                        </div>
                        <p className="text-[#324152]">{comment.author}</p>
                        <p className="text-[#67727e]">{comment.updated}</p>
                    </div>
                    <div className="comment-content | text-[#67727e] font-light row-start-2 col-start-1 col-end-3"><p>{comment.content}</p></div>
                    <div className="comment-score | bg-[#f5f6fa] flex items-center w-fit row-start-3">
                        <button className="px-3 py-4 group">
                            <svg className="fill-[#C5C6EF] group-hover:fill-blue-500" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>
                        </button>
                        <span className="px-3 text-[#5457b6]">{comment.score}</span>
                        <button className="px-3 py-4 group">
                            <svg className="fill-[#C5C6EF] group-hover:fill-blue-500" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/></svg>
                        </button>
                    </div>
                    <div className="comment-action | flex gap-5 row-start-4 md:row-start-3 md:ml-auto">
                        <button onClick={() => setIsReplying(prev => !prev)} className="flex gap-1 items-center text-[#5357B6]"><img className="max-h-4" src="/smallSvg/icon-reply.svg" alt="" /> Reply</button>
                        <button className="flex gap-1 items-center text-[#ED6368]"><img className="max-h-4" src="/smallSvg/icon-delete.svg" alt="" /> Delete</button>
                        <button onClick={() => setIsEditing(prev => !prev)} className="flex gap-1 items-center text-[#5357B6]"><img className="max-h-4" src="/smallSvg/icon-edit.svg" alt="" /> Edit</button>
                    </div>
                </>)}
            </div>
            {isReplying && <Form />}
        </div>
    )
}

export default Comment