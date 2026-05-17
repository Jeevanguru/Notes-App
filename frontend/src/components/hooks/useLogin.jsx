import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { AuthContext, UserContext } from "../../context/AllContexts";

const baseURL = import.meta.env.VITE_BASE_API_END_POINT;

const useLogin = () => {
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
    const { user , setUser } = useContext(UserContext);
    const navigateTo = useNavigate();

    const standardLogin = async (formData) => {
        const loadingText = toast.loading("Logging in...Please wait...")

        try {
            const res = await axios.post(`${baseURL}/auth/login`, formData);

            toast.update(loadingText, {
                render: "Login Successful!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            localStorage.setItem("notesapptoken", res.data.token);
            setUser(res.data.user);
            setLoggedIn(() => true)
            navigateTo("/", { replace: true });

            console.log(isLoggedIn);
            console.log(user);

        } catch (e) {
            toast.update(loadingText, {
                render :e?.response?.data?.error || "Login Failed",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            console.log("Error in email login:", e?.response?.data || e.message);
        }
    }
    
    const googleLogin = async (formData) => {
        try {
            const res = await axios.post(`${baseURL}/google-login`, { formData })
            console.log(res.data);
            return res.data;
        } catch(e) {
            console.log('Error in email login', e.message);
        }
    }
    return { standardLogin, googleLogin }
}

export default useLogin;