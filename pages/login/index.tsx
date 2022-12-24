import { FormEvent, useRef } from "react";

export default function Login() {
    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const password = passwordRef?.current?.value
        const login = loginRef?.current?.value
        const bodyData = {
            login,
            password
        }

        const response: Response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            body: JSON.stringify(bodyData)
        })

        const token = await response.json()

        console.log(token)
    }

    return (
      <div>
        <form onSubmit={handleSubmit} className="grid min-h-screen gap-6 place-content-center">
            <input ref={loginRef} className="outline outline-gray-900 rounded-full p-4" type="text" placeholder="login"/>
            <input ref={passwordRef} className="outline outline-gray-900 rounded-full p-4" type="password" placeholder="password"/>
            <button>Login</button>
        </form>
      </div>
    )
  }