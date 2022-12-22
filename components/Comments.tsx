import CommentModule from "./CommentModule"
import { commentInterface } from "./interfaces/commentInterface"

const Comments = () => {

    const response: commentInterface = {
        id: '2',
        img: '/image-amyrobson.png',
        author: 'Amy Robson',
        updated: 'just now',
        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        score: 0,
        parentId: '1',
        responses: null
    }

    
    const secondResponse: commentInterface = {
        id: '3',
        img: '/image-amyrobson.png',
        author: 'Amy Robson',
        updated: 'just now',
        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        score: 0,
        parentId: '1',
        responses: null
    }

    const comment: commentInterface[] = [{
        id: '1',
        img: 'image-amyrobson.png',
        author: 'Amy Robson',
        updated: 'just now',
        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        score: 0,
        parentId: null,
        responses: [response, secondResponse]
    },
    {
        id: '4',
        img: 'image-amyrobson.png',
        author: 'Amy Robson',
        updated: 'just now',
        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        score: 0,
        parentId: null,
        responses: [response, secondResponse]
    }]

    

    return (
        <div className="w-[min(90%,40em)] mx-auto flex flex-col gap-5">
            {comment && comment.map(comm => (
                <CommentModule key={comm.id} comment={comm}/>
            ))}
        </div>
    )
}

export default Comments