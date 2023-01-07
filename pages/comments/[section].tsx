import Comments from "../../components/Comments"
import Form from "../../components/Form"
import { useRouter } from 'next/router'
import { TokenContext } from "../../components/TokenProvider"
import { useContext, useState } from "react"
import Link from "next/link"
import { commentInterface } from "../../components/interfaces/commentInterface"
import useGetComments from "../../hooks/useGetComments"

const Section = () => {

    const router = useRouter()
    const { section } = router.query
    const context = useContext(TokenContext)
    const user = context?.user
    const [refetch, setRefetch] = useState<boolean>(false)
    const { comments, isLoading, error } = useGetComments<commentInterface[] | null>(section, refetch)
    const getComments = () => setRefetch(prev => !prev)
    const sortedComments = comments?.sort((a,b) => a.createdOn > b.createdOn ? -1 : 1)
    

    return (
        <div className="bg-[#f5f6fa] min-h-screen flex flex-col gap-6 py-10">
            <div>
                <Link className="px-4 py-2 rounded-full bg-gray-200" href="/">Homepage</Link>
            </div>
            <div className="w-[min(90%,40em)] mx-auto p-3 bg-white h-fit">
                {user ? <Form section={section} getComments={getComments}/> : <div><p>Login to add comments</p><Link href='/login'>Login here</Link></div>}
            </div>
            {sortedComments && sortedComments.length > 0 &&  <Comments comments={sortedComments} getComments={getComments}/>}
            {isLoading && <p>Loading spinner</p>}
            {error && <p>error</p>}
        </div>
    )
}

export default Section