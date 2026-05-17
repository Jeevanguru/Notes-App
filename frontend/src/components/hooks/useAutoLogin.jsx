import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext, UserContext } from "../../context/AllContexts";

const useAutoLogin = () => {
    const baseURL = import.meta.env.VITE_BASE_API_END_POINT;
    const { setUser } = useContext(UserContext)
    const { setLoggedIn } = useContext(AuthContext)
    const navigateTo = useNavigate();

    const getToken = async () => {
        const token = localStorage.getItem("notesapptoken")

        if(!token) {
            navigateTo("/login")
            return;
        }

        const loadingToast = toast.loading('Loading...')

        try {
            const res = await axios.get(`${baseURL}/auth/verify-token`, {
                headers: { Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data.user);

            setLoggedIn(true)
            setUser(res.data.user)
            toast.update(loadingToast, {
                render: "Profile Loaded Successful",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (e) {
            toast.update(loadingToast, {
                render: e.response?.data?.message || "Session Expired",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            navigateTo("/login");
            console.log("Error", e.message);
        }
    }
    return { getToken }
}

export default useAutoLogin;