import { TokenContext } from "./TokenProvider"
import { useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import useAxios from "../hooks/useAxios"


export default function Navbar() {

    const user = useContext(TokenContext)?.user
    const router = useRouter()
    const currentPage = router.asPath
    const axiosInstance = useAxios()
    const context = useContext(TokenContext)


    const activeClasses = 'after:scale-x-100'
    function isActive(url: string) {
        return currentPage === url ? activeClasses : null
    }

    async function handleLogout () {
        try {
            const response = await axiosInstance.get('auth/logout')
            console.log(response)
            context?.setJWT(null)
            context?.setUser(null)
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <nav className="bg-blue-300 px-10">
            {user ? (
                <div className="flex w-full gap-4 items-center place-content-start">
                    <p>Section:</p>
                    <ul className="flex gap-2 items-center">
                        <li><Link className={`p-4 block hover-effect ${isActive('/comments/main')}`} href="/comments/main">main</Link></li>
                        <li><Link className={`p-4 hover-effect ${isActive('/comments/recipies')}`} href="/comments/recipies">recipies</Link></li>
                        <li><Link className={`p-4 hover-effect ${isActive('/comments/others')}`} href="/comments/others">others</Link></li>
                    </ul>
                        <Link className={`hover-effect ${isActive('/')} p-4 ml-auto`} href="/">homepage</Link>
                        <button onClick={handleLogout} className={`hover-effect p-4`} >logout</button>
                    <div className="flex gap-4 items-center">
                        <div className="h-6">
                            <img className="max-h-[100%]" src={`/avatars/${user?.avatar}`} alt="" />
                        </div>
                        <p>{user?.login}</p>
                    </div>
                </div>
            ) : (
                <ul className="flex w-full gap-4 items-center place-content-start">
                    <li><Link className={`p-4 hover-effect ${isActive('/login')}`} href='/login'>Login</Link></li>
                    <li><Link className={`p-4 hover-effect ${isActive('/login/register')}`} href='/login/register'>Register</Link></li>
                    <li><Link className={`hover-effect ${isActive('/')} p-4 ml-auto`} href="/">homepage</Link></li>
                </ul>
            )}
        </nav>
    )
}