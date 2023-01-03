import Link from "next/link"
import useAuthContext from "../hooks/useAuthContext"
import { useEffect } from "react"
import useAxios from "../hooks/useAxios"

export default function index() {
    const context = useAuthContext()
    const axiosInstance = useAxios()

    const user = context?.user

    useEffect(() => {
      const getLogin = async () => {
        try {
          const response = await axiosInstance.get('auth/profile')
          console.log(response.data)
        } catch (error) {
          console.log(error)
        }
      }
      getLogin()
    },[])

    return (
      <>
        {user ? (
          <div className="p-8">
            <div className="flex gap-4 py-8 items-center">
              <p>{user.login}</p>
              <img className="w-8 aspect-square" src={`/avatars/${user?.avatar}`} alt="" />
            </div>
            <div>
              <p>Sections:</p>
              <ul className="w-max grid gap-3">
                <li className="text-center p-2 rounded-full bg-gray-200 w-full"><Link href="comments/main">Main</Link></li>
                <li className="text-center p-2 rounded-full bg-gray-200 w-full"><Link href="comments/others">others</Link></li>
                <li className="text-center p-2 rounded-full bg-gray-200 w-full"><Link href="comments/recipies">recipies</Link></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-[#f5f6fa] min-h-screen flex flex-col gap-6 py-10">
            Starting page
            <Link href="/login">Login</Link>
            <Link href="/login/register">Register</Link>
          </div>

        )}
      </>
    )
}