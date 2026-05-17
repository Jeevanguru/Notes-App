import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import GoogleOauth from "./GoogleAuth";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";

const Login = () => {
  const { standardLogin } = useLogin();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    loginType: "standard",
    email: "",
    password: "",
  });

  const emailRegex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter valid email");
      return;
    }

    if (
      !passwordRegex.test(formData.password.trim())
    ) {
      toast.error("Invalid password format");
      return;
    }

    await standardLogin(formData);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-[#1a1a1a] via-[#5f5f5f] to-[#0d0d0d]">

      {/* Main Glass Card */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Top */}
        <div className="px-8 pt-10 pb-7 text-center border-b border-white/10">

          {/* Logo Circle */}
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-inner">

            <Lock
              size={34}
              className="text-gray-200"
            />
          </div>

          <h1 className="text-4xl font-bold tracking-wide text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-300">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <div className="p-8">

          <form
            onSubmit={handleFormSubmit}
            className="space-y-6"
          >

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-all duration-300 focus-within:border-gray-300 focus-within:bg-white/10">

                <Mail
                  size={20}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-all duration-300 focus-within:border-gray-300 focus-within:bg-white/10">

                <Lock
                  size={20}
                  className="text-gray-400"
                />

                <input
                  minLength={8}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">

            <div className="h-[1px] flex-1 bg-white/10"></div>

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          {/* Google */}
          <div className="flex justify-center">
            <GoogleOauth />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">

            <p className="text-gray-400">
              Don’t have an account?{" "}

              <Link
                to="/signup"
                className="font-semibold text-gray-200 underline underline-offset-4 hover:text-white"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;