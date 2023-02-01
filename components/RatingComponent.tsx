import { FunctionComponent } from "react"
import { ratingInterface } from '../components/interfaces/commentInterface'
import { commentInterface } from "./interfaces/commentInterface"
import useApiFunctions from "../controllers/useApiFunctions"


interface Props {
    comment: commentInterface;
    user: any;
}

const RatingComponent: FunctionComponent<Props> = ({ comment, user }) => {

    const { handleRatingApi } = useApiFunctions()

    return (
        <div className="comment-score | bg-[#f5f6fa] flex items-center w-fit row-start-3">
            <button onClick={() => handleRating('downvote')} className='px-3 py-4 group'>
                <svg className={`fill-[#C5C6EF] group-hover:fill-blue-500 ${userRating() === 'downvote' && 'fill-blue-500'}`} width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>
            </button>
            <span className="px-3 min-w-[2.5rem] text-[#5457b6]">{getScore(comment.rated)}</span>
            <button onClick={() => handleRating('upvote')} className="px-3 py-4 group">
                <svg className={`fill-[#C5C6EF] group-hover:fill-blue-500 ${userRating() === 'upvote' && 'fill-blue-500'}`} width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/></svg>
            </button>
        </div>
                        
    )
    
    // Sends api call to modify db
    async function handleRating(rate: 'upvote' | 'downvote') {
        if(!user) return window.alert('Sign in to rate comments')
            const response = await handleRatingApi(comment._id, {
                    ratingUserId: user?._id as string,
                    rate
            })
            return response
    }

    // Counts the score of the comment
    function getScore (score: ratingInterface[]) {
        return score.reduce((acc,curr) => curr.rate === 'upvote' ? acc += 1 : acc -= 1, 0)
    }

    // Checks if and how the user rated the comment 
    function userRating() {
        const rate = comment.rated.find(rate => rate.ratingUserId === user?._id)
        return rate?.rate
    }
}

export default RatingComponent