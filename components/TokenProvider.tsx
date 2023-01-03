import { Context, createContext, Dispatch, SetStateAction, useState } from "react"
import { UserInterface } from './interfaces/commentInterface'

export interface ContextInterface {
    JTW: string | null;
    setJWT: Dispatch<SetStateAction<string | null>>;
    user:UserInterface | null;
    setUser: Dispatch<SetStateAction<UserInterface | null>>;
}
export const TokenContext = createContext<ContextInterface | null>(null)

const TokenProvider = ({children}: any) => {

    const [JTW, setJWT] = useState<string | null>(null)
    const [user, setUser] = useState<UserInterface | null>(null)

    return (
        <TokenContext.Provider value={{JTW, setJWT, user, setUser}}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider