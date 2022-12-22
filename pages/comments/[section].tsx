import Comments from "../../components/Comments"
import Form from "../../components/Form"
import { useRouter } from 'next/router'

const Section = () => {

    const router = useRouter()
    const { section } = router.query

    return (
        <div className="bg-[#f5f6fa] min-h-screen flex flex-col gap-6 py-10">
          <div className="w-[min(90%,40em)] mx-auto p-3 bg-white h-fit">
            <Form />
          </div>
          <Comments/>
        </div>
      )
}

export default Section