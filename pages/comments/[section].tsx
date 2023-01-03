import Comments from "../../components/Comments"
import Form from "../../components/Form"
import { useRouter } from 'next/router'
import { TokenContext } from "../../components/TokenProvider"
import { useCallback, useContext, useEffect, useState } from "react"
import Link from "next/link"
import { commentInterface } from "../../components/interfaces/commentInterface"
import useAxios from "../../hooks/useAxios"
// import useSwr from 'swr'



const Section = () => {

    const [comments, setComments] = useState<commentInterface[] | null>(null)
    const router = useRouter()
    let { section } = router.query
    const context = useContext(TokenContext)
    const user = context?.user
    const axiosInstance = useAxios()

    const getComments = useCallback(() => {
      const get = async () => {
        try {
          const response = await axiosInstance.get(`comments/${section}`)
          setComments(response?.data)
          return
        } catch (error) {
          return 
        }
      }
      get()
    },[section, axiosInstance])

    useEffect(() => {
      getComments()
    },[getComments])

    return (
        <div className="bg-[#f5f6fa] min-h-screen flex flex-col gap-6 py-10">
            <div>
              <Link className="px-4 py-2 rounded-full bg-gray-200" href="/">Homepage</Link>
            </div>
          <div className="w-[min(90%,40em)] mx-auto p-3 bg-white h-fit">
            {user ? <Form section={section} getComments={getComments}/> : <div><p>Login to add comments</p><Link href='/login'>Login here</Link></div>}
          </div>
          {comments && comments.length > 0 &&  <Comments comments={comments.sort((a,b) => a.createdOn > b.createdOn ? -1 : 1)} getComments={getComments}/>}
          <div>
          </div>
        </div>
      )
}

export default Section