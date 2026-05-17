import GoogleOauth from "./GoogleAuth";
import useSignUp from "../hooks/useSignUp";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const { signUp, loading } = useSignUp();

    const [formdata, setFormdata] = useState({
        loginType: "standard",
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const usernameRegex = /^[a-zA-Z0-9 ]{5,}$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!usernameRegex.test(formdata.name.trim())) {
            toast.error("Invalid username");
            return;
        }

        if (!emailRegex.test(formdata.email.trim())) {
            toast.error("Invalid email");
            return;
        }

        if (!passwordRegex.test(formdata.password)) {
            toast.error("Weak password");
            return;
        }

        await signUp(formdata);
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-[#1f1f1f] via-[#555555] to-[#0f0f0f]">

            {/* Glass Card */}
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] p-8">

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-white tracking-wide">
                        Create Account
                    </h1>

                    <p className="text-gray-300 mt-2 text-sm">
                        Join the experience
                    </p>
                </div>

                <form
                    onSubmit={handleFormSubmit}
                    className="space-y-5"
                >

                    {/* Username */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            Username
                        </label>

                        <input
                            type="text"
                            name="name"
                            onChange={handleFormChange}
                            required
                            placeholder="Enter username"
                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-gray-300 focus:bg-white/10 transition-all duration-300"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            onChange={handleFormChange}
                            required
                            placeholder="Enter email"
                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-gray-300 focus:bg-white/10 transition-all duration-300"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                minLength={8}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleFormChange}
                                required
                                placeholder="Enter password"
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 pr-20 text-white placeholder:text-gray-400 outline-none focus:border-gray-300 focus:bg-white/10 transition-all duration-300"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white transition"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300 text-black font-semibold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-7">
                    <div className="h-[1px] flex-1 bg-white/10"></div>

                    <span className="text-gray-400 text-sm">
                        OR
                    </span>

                    <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>

                {/* Bottom */}
                <div className="space-y-5">

                    <div className="text-center text-gray-300 text-sm">
                        Continue with Google
                    </div>

                    <div className="flex justify-center">
                        <GoogleOauth />
                    </div>

                    <div className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-gray-200 hover:text-white underline"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;