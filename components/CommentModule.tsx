import { commentInterface } from "./interfaces/commentInterface"
import Comment from "./Comment"
import { Dispatch, SetStateAction, useState } from "react"


interface props {
    comment: commentInterface;
    responses: commentInterface[];
    getComments? :() => void;
    setModal: Dispatch<SetStateAction<boolean>>;
    
}

const CommentModule = ({comment, responses, getComments, setModal} : props) => {

    const [hidden, setHidden] = useState<boolean>(true)
    const buttonLabel = `${hidden ? 'show' : 'hide'} ${responses.length} ${responses.length === 1 ? 'reply' : 'replies'}`
    
    return (
        <div className="grid gap-3">
            <Comment 
                setModal={setModal} 
                comment={comment} 
                parentId={comment._id} 
                getComments={getComments}
            />
            {responses && responses.length > 0 && (
                <div 
                    className="relative w-[90%] ml-auto after:absolute after:inset-y-0 after:w-[1px] after:bg-[hsla(0,0%,83%,.65)] after:-left-[10%] grid gap-4">
                    <button className="ml-auto" onClick={() => setHidden(prev => !prev)}>{buttonLabel}</button>
                    {!hidden && responses.map(resp => (
                        <Comment 
                            comment={resp} 
                            key={resp._id} 
                            parentId={comment._id} 
                            getComments={getComments}
                            setModal={setModal}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentModule