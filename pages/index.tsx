import Link from "next/link"
import Comments from "../components/Comments"
import Form from "../components/Form"

export default function index() {  
  return (
    <div className="bg-[#f5f6fa] min-h-screen flex flex-col gap-6 py-10">
      Starting page
      <Link href="/comments/Section-a">Section a</Link>
      <Link href="/comments/Section-b">Section b</Link>
    </div>
  )
}