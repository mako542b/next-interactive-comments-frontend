import { Dispatch, FormEvent, SetStateAction, useRef} from "react"

interface props {
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    prevContent: string,
}

const EditForm = ({setIsEditing, prevContent}: props) => {

    const textArea = useRef<HTMLTextAreaElement>(null)
    const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const Message = textArea?.current?.value
        console.log(Message)
        return
    }

     return (
        <form className="bg-white min-h-[10rem]" onSubmit={handleEditSubmit}>
            <textarea ref={textArea} className="resize-y h-[90%] w-full outline outline-1 outline-gray-700 rounded-lg p-3" name="comment" placeholder="Add a comment...">{prevContent}</textarea>
            <button className="bg-teal-300 px-6 py-2 rounded-md">Edit</button>
            <button type="button" onClick={() =>setIsEditing(false)}>Cancel</button>
        </form>
    )
}

export default EditForm