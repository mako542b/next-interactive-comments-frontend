import { createContext, Dispatch, SetStateAction, useState } from "react"
import { UserInterface } from './interfaces/commentInterface'

export interface ContextInterface {
    JTW: string | null;
    setJWT: Dispatch<SetStateAction<string | null>>;
    user:UserInterface | null;
    setUser: Dispatch<SetStateAction<UserInterface | null>>;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    refetch: boolean;
    setRefetch: Dispatch<SetStateAction<boolean>>;
}
export const TokenContext = createContext<ContextInterface | null>(null)

const TokenProvider = ({children}: any) => {

    const [JTW, setJWT] = useState<string | null>(null)
    const [user, setUser] = useState<UserInterface | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [refetch, setRefetch] = useState<boolean>(false)


    return (
        <TokenContext.Provider value={{ JTW, setJWT, user, setUser, modal, setModal, refetch, setRefetch }}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider