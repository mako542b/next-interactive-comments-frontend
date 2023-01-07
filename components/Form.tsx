import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react"
import { TokenContext } from "./TokenProvider"
import { useContext } from "react"
import { useRouter } from "next/router"
import useApiFunctions from '../controllers/useApiFunctions'


interface props {
    section?: string | string[] | undefined;
    replyingTo?: string;
    parentId? :string;
    getComments? :() => void;
    setIsReplying?: Dispatch<SetStateAction<boolean>>; 
}

const Form = ({replyingTo, parentId, getComments, setIsReplying}: props) => {

    const [error, setError] = useState<string | null>(null)
    const { createComment } = useApiFunctions()
    const { section } = useRouter().query
    const textArea = useRef<HTMLTextAreaElement>(null)
    const user = useContext(TokenContext)?.user

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
        const messageDto = createMessage()
        if(!messageDto) return
        try {
            const response = createComment(messageDto)
            if(textArea?.current) textArea.current.value = ''
            getComments?.()
            setIsReplying?.(false)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    function createMessage() {
        const content = trimReplyingTo(textArea?.current?.value as string)
        if(content?.trim() === '') return setError('Comment cannot be empty')
        const messageDto = {
            user: user?._id,
            content,
            createdOn: new Date().toLocaleString(),
            section,
            parentId: parentId || null,
            replyingTo,
        }
        return messageDto
    }

    function trimReplyingTo(text: string) {
        if(!replyingTo) return text
        const regex = new RegExp(`@${replyingTo}`,'ig')
        if(!regex.test(text)) return text
        return text.replace(regex,'')
    }
}

export default Form