import Comments from "../../components/Comments"
import Form from "../../components/Form"
import { useRouter } from 'next/router'
import { TokenContext } from "../../components/TokenProvider"
import { useContext, useState } from "react"
import Link from "next/link"
import { commentInterface } from "../../components/interfaces/commentInterface"
import useGetComments from "../../hooks/useGetComments"
import LoginForm from "../../components/LoginForm"

const Section = () => {

    const router = useRouter()
    const { section } = router.query
    const context = useContext(TokenContext)
    const user = context?.user
    const [refetch, setRefetch] = useState<boolean>(false)
    const { comments, isLoading, error, modal, setModal } = useGetComments<commentInterface[] | null>(section, refetch)
    const sortedComments = comments?.sort((a,b) => a.createdOn > b.createdOn ? -1 : 1)
    
    const getComments = () => {
        return setRefetch(prev => !prev)
    }
    
    function refreshLogin() {
        setModal(false) 
        getComments()
    }
    

    return (
        <div className="bg-[#f5f6fa] min-h-screen flex flex-col gap-6 py-10">
            <div>
                <Link className="px-4 py-2 rounded-full bg-gray-200" href="/">Homepage</Link>
            </div>
            <div className="w-[min(90%,40em)] mx-auto p-3 bg-white h-fit">
                {user ? <Form section={section} getComments={getComments} setModal={setModal}/> : <div><p>Login to add comments</p><Link href='/login'>Login here</Link></div>}
            </div>
            {sortedComments && sortedComments.length > 0 &&  <Comments setModal={setModal} comments={sortedComments} getComments={getComments}/>}
            {/* {isLoading && <p className="fixed top-[50%] left-[50%]">Loading spinner</p>} */}
            {error && <p>error</p>}
            {modal && (
                <div className="fixed inset-y-[10%] inset-x-1/4 grid content-center bg-teal-200">
                    <button className="z-50 absolute right-4 top-2" onClick={() => setModal(false)}>X</button>
                    <LoginForm setModal={refreshLogin}/>
                    <p className="p-6">Your session expired</p>
                </div>
            )}
        </div>
    )
}

export default Section