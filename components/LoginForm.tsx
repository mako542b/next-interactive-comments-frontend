import { FormEvent, useRef, useState, useContext } from "react";
import {useRouter} from "next/router";
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import { TokenContext } from "../components/TokenProvider";

export default function LoginForm({ setModal }: any) {
    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const context = useContext(TokenContext)

    const axiosInstance = useAxios()

    async function refreshUser (token: string) {
      const user = await axios.get('auth/profile',{
          headers: { 
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`,
          },
      })
      return context?.setUser?.(user.data)
  }
    

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
          refreshUser(response.data.access_token)
          context?.setModal?.(false)
          // const user = await axiosInstance.get('/auth.profile')
          if(router.pathname === '/login') return router.push('/comments/main')
          return 
          
        } catch (error) {
          return setError('Something went wrong...')
        }
        
    }

    return (
      <div>
        <form onSubmit={handleSubmit} className="grid gap-6 place-content-center">
            <input required={true} minLength={6} ref={loginRef} className="outline outline-gray-900 rounded-full p-4" type="text" placeholder="login"/>
            <input required={true} minLength={6} ref={passwordRef} className="outline outline-gray-900 rounded-full p-4" type="password" placeholder="password"/>
            {error && <p className="text-red-500">{error}</p>}
            <button>Login</button>
        </form>
      </div>
    )
  }