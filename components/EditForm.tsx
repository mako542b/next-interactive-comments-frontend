import { Dispatch, FormEvent, SetStateAction, useRef, useState} from "react"
import useApiFunctions from '../controllers/useApiFunctions'

interface props {
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    prevContent: string,
    commentId?: string,
    getComments? :() => void,
}

const EditForm = ({setIsEditing, prevContent, commentId, getComments}: props) => {
    const { editCommentApi } = useApiFunctions()

    const [editingContent, setEditingContent] = useState<string>(prevContent)

    async function handleEdit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const editedComment = await editCommentApi(commentId as string, editingContent)
            if(getComments) getComments()
            setIsEditing(false)
            return editedComment
        } catch (error) {
            return console.log(error)
        }
        return
    }

     return (
        <form className="bg-white min-h-[10rem]" onSubmit={handleEdit}>
            <textarea value={editingContent} onChange={(e) => setEditingContent(e.target.value)} className="resize-y h-[90%] w-full outline outline-1 outline-gray-700 rounded-lg p-3" name="comment" placeholder="Add a comment..."></textarea>
            <button className="bg-teal-300 px-6 py-2 rounded-md">Edit</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
    )
}

export default EditForm