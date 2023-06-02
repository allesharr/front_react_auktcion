import { useActions } from "./useActions"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
    const { setIsAuth } = useActions()
    const navigate = useNavigate() 
    return () => {
        setIsAuth(false)
        localStorage.removeItem("session_key")
        navigate('/login',{replace: true})
    }
}
