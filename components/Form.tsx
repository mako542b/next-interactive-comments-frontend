import { FormEvent, useRef } from "react"

const Form = () => {

    const textArea = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const Message = textArea?.current?.value
        console.log(Message)
        if(textArea?.current) textArea.current.value = ''
        return
    }

     return (
        <form className="bg-white" onSubmit={handleSubmit}>
            <textarea ref={textArea} className="resize-y w-full outline outline-1 outline-gray-700 rounded-lg p-3" name="comment" placeholder="Add a comment..."></textarea>
            <button className="bg-teal-300 px-6 py-2 rounded-md">Send</button>
        </form>
    )
}

export default Form