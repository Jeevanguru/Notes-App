import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useSignUp = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const baseURL = import.meta.env.VITE_BASE_API_END_POINT;
    
    const signUp = async (formData) => {
        setLoading(true)

        try {
            await axios.post(`${baseURL}/auth/signup`, formData)
            toast.update("signup", {
                render: "Account created successfully",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            navigate("/login");

        } catch (e) {
            const errorMsg = e.response?.data?.message || "Failed to create account";

            toast.update("signup", {
                render: errorMsg,
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    return { signUp, loading }
}

export default useSignUp;