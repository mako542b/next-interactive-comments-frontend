import { FormEvent, useRef, useState } from "react"
import { useRouter } from "next/router"

const Register = () => {

    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [avatarUrl, setAvatar] = useState<string>('spikedball.png')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()


    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if(passwordRef.current?.value !== confirmPasswordRef.current?.value){
            setError("Passwords don't match")
            return
        }
        const login = loginRef.current?.value
        const password = passwordRef.current?.value
        const bodyData = {login, password, avatar:avatarUrl}
        try {
            const response = await fetch('http://localhost:3000/login/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                body: JSON.stringify(bodyData)
            })
            const resp = await response.json()
            console.log(response.status)
            if(!response.ok) return setError('Try different login!!')
            return router.push('/')
        } catch (error) {
            console.log(error)
            return
        }
    }

    const avatarList = ['green.png', 'oxygen.png', 'spikedball.png', 'volley.bmp']



    return (
        <div className="grid place-content-center min-h-screen">
            <h1 className="mb-16 text-xl text-center">Create new account</h1>
            <form onSubmit={handleSubmit} className="grid gap-6 place-content-center">
            <input required={true} minLength={6} ref={loginRef} className="outline outline-gray-900 rounded-full p-4" type="text" placeholder="login"/>
            <input required={true} minLength={6} ref={passwordRef} className="outline outline-gray-900 rounded-full p-4" type="password" placeholder="password"/>
            <input required={true} minLength={6} ref={confirmPasswordRef} className="outline outline-gray-900 rounded-full p-4" type="password" placeholder="confirm password"/>
            {error && <p className="text-red-500">{error}</p>}
            <p>Choose yor avatar:</p>
            <div className="flex gap-4">
                {avatarList.map(avatar => (
                    <button type='button' className={`rounded-full ${avatarUrl === avatar ? 'outline outline-4 outline-offset-2 outline-orange-600' : 'hover:scale-125'}`} key={avatar} onClick={() => setAvatar(avatar)}>
                        <img src={`/avatars/${avatar}`} alt="" className='w-8 h-8 rounded-full'/>
                    </button>
                ))}
            </div>
            <button className="rounded-full px-6 py-2 bg-teal-100 hover:bg-red-100">Register</button>
        </form>
        </div>
    )
}

export default Register