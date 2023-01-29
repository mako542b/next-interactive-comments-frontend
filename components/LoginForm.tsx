import { FormEvent, useRef, useState } from "react";
import Link from "next/link"
import {useRouter} from "next/router";
import useAxios from "../hooks/useAxios";

export default function LoginForm({setModal} : any) {
    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const axiosInstance = useAxios()

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const password = passwordRef?.current?.value
        const login = loginRef?.current?.value
        const bodyData = {
            login,
            password
        }
        try {
          const response = await axiosInstance.post('auth/login', bodyData)
          if(response.status > 300) return setError('Something went wrong')
          setModal(false)
          return router.push('/comments/main')
          
        } catch (error) {
          console.log(error)
          return setError('Something went wrong...')
        }
        
    }

    return (
      <div>
        <form onSubmit={handleSubmit} className="grid min-h-screen gap-6 place-content-center">
            <input required={true} minLength={6} ref={loginRef} className="outline outline-gray-900 rounded-full p-4" type="text" placeholder="login"/>
            <input required={true} minLength={6} ref={passwordRef} className="outline outline-gray-900 rounded-full p-4" type="password" placeholder="password"/>
            {error && <p className="text-red-500">{error}</p>}
            <button>Login</button>
        </form>
      </div>
    )
  }