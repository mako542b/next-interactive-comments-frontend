import axios from '../api/axios'
import { useContext } from "react";
import { TokenContext } from "../components/TokenProvider";


export default function useRefreshToken() {

    const context = useContext(TokenContext)

    async function refreshUser (token: string) {
        const user = await axios.get('auth/profile',{
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        })
        return context?.setUser?.(user.data)
    }


    async function refresh(): Promise<string> {
        const response = await axios.get('auth/refresh')
        const token = response.data.access_token
        context?.setJWT?.(token)
        refreshUser(token)
        return token
    }

    return refresh
}