import { useContext, useEffect } from "react";
import useAutoLogin from "../hooks/useAutoLogin";
import { AuthContext } from "../../context/AllContexts";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
const Index = () => {
    const { getToken } = useAutoLogin();
    const { IsLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        if (!IsLoggedIn) {
            getToken();
        }
    }, [IsLoggedIn]);

    return (
        <main className="relative min-h-screen">
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Index;