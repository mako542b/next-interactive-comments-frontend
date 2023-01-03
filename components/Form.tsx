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
    const { createComment } = useApiFunctions()
    const router = useRouter()
    let { section } = router.query
    const textArea = useRef<HTMLTextAreaElement>(null)
    const context = useContext(TokenContext)
    const user = context?.user
    const [error, setError] = useState<string | null>(null)

    const createMessage = () => {
        const content = textArea?.current?.value
        if(content?.trim() === '') {
            setError('Comment cannot be empty')
            return null
        }
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

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const messageDto = createMessage()
        if(!messageDto) return
        try {
            const response = await createComment(messageDto)
            if(textArea?.current) textArea.current.value = ''
            if(getComments) getComments()
            if(setIsReplying) setIsReplying(false)
            return response
        } catch (error) {
            console.log(error)
        }
    }

     return (
        <div>
            {context?.user && (
                <div className="flex gap-4 py-4">
                    <img src={`/avatars/${context.user.avatar}`} alt="" className="w-6 aspect-square rounded-full"/>
                    <p>{context.user.login}</p>
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
}

export default Form