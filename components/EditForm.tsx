import { Dispatch, FormEvent, SetStateAction, useRef } from "react"
import useApiFunctions from '../controllers/useApiFunctions'

interface props {
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    prevContent: string,
    commentId?: string,
}

const EditForm = ({setIsEditing, prevContent, commentId }: props) => {

    const { editCommentApi } = useApiFunctions()
    const editingContent = useRef<HTMLTextAreaElement>(null)

     return (
        <form className="bg-white min-h-[10rem]" onSubmit={handleEdit}>
            <textarea ref={editingContent} className="resize-y h-[90%] w-full outline outline-1 outline-gray-700 rounded-lg p-3" name="comment" placeholder="Add a comment...">
                {prevContent}
            </textarea>
            <button className="bg-teal-300 px-6 py-2 rounded-md">Edit</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
    )

    async function handleEdit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newContent = editingContent.current?.value as string
        const response = await editCommentApi(commentId as string, newContent)
        setIsEditing(false)
        return response
    }

}

export default EditForm