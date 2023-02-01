import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react"
import { TokenContext } from "./TokenProvider"
import { useContext } from "react"
import { useRouter } from "next/router"
import useApiFunctions from '../controllers/useApiFunctions'
import { createMessage } from "../controllers/form.controllers"


interface props {
    section?: string | string[] | undefined;
    replyingTo?: string;
    parentId? :string;
    getComments? :() => void;
    setIsReplying?: Dispatch<SetStateAction<boolean>>;
    setModal?: Dispatch<SetStateAction<boolean>>;
}

const Form = ({ replyingTo, parentId, getComments, setIsReplying, setModal }: props) => {

    const [error, setError] = useState<string | null>(null)
    const { section } = useRouter().query
    const textArea = useRef<HTMLTextAreaElement>(null)
    const user = useContext(TokenContext)?.user

    const apiFunctions = useApiFunctions()

     return (
        <div>
            {user && (
                <div className="flex gap-4 py-4">
                    <img src={`/avatars/${user?.avatar}`} alt="" className="w-6 aspect-square rounded-full"/>
                    <p>{user?.login}</p>
                </div>
            )}
            <form className="bg-white" onSubmit={handleSubmit}>
                <textarea onChange={() => error? setError(null) : null} ref={textArea} className="resize-y w-full outline outline-1 outline-gray-700 rounded-lg p-3" name="comment" placeholder="Add a comment...">
                        {replyingTo ? `@${replyingTo} ` : ''}
                </textarea>
                <button className="bg-teal-300 px-6 py-2 rounded-md">Send</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )


    
    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const content = textArea?.current?.value as string
        if(content?.trim() === '') return setError('Comment cannot be empty')
        const messageDto = createMessage(content, user?._id as string, section as string, parentId, replyingTo)
        const response = await apiFunctions.createComment(messageDto)
        if(response && response.error === 'timeout') setModal?.(true)
        if(!response) return setError('Something went wrong')
        resetForm()
        return response
    }
    
    function resetForm() {
        if(textArea?.current) textArea.current.value = ''
        getComments?.()
        setIsReplying?.(false)
    }

    

}

export default Form