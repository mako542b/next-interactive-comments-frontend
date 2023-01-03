import { useContext } from "react";
import { TokenContext } from "../components/TokenProvider";

const useAuthContext = () => {
    const context = useContext(TokenContext)
    return context
}

export default useAuthContext