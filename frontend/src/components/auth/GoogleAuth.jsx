import axios from "axios";
import { useContext, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../context/AllContexts";
import { toast } from "react-toastify";

const GoogleOauth = () => {
  const baseURL = import.meta.env.VITE_BASE_API_END_POINT;

  const googleButtonRef = useRef(null);
  const initializedRef = useRef(false);

  const navigateTo = useNavigate();

  const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(AuthContext);

  const handleCredentialResponse = useCallback(async (response) => {
    const loadingToast = toast.loading("Logging in...");

    try {
      const res = await axios.post(
        `${baseURL}/auth/google-login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${response.credential}`,
          },
        }
      );

      toast.update(loadingToast, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      localStorage.setItem("notesapptoken", res.data.token);

      setUser(res.data.user);
      setLoggedIn(true);

      navigateTo("/");
    } catch (e) {
      toast.update(loadingToast, {
        render: e?.response?.data?.message || "Login failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      console.log(e);
    }
  }, [baseURL, navigateTo, setLoggedIn, setUser]);

  const initializeGoogleSignIn = useCallback(() => {
    if (
      initializedRef.current ||
      !window.google ||
      !googleButtonRef.current
    ) {
      return;
    }

    initializedRef.current = true;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        theme: "outline",
        size: "large",
        text: "signin_with",
        width: 300,
      }
    );
  }, [handleCredentialResponse]);

  useEffect(() => {
    // Script already exists
    const existingScript = document.getElementById("google-oauth-script");

    if (existingScript) {
      initializeGoogleSignIn();
      return;
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-oauth-script";

    script.onload = initializeGoogleSignIn;

    document.body.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
    };
  }, [initializeGoogleSignIn]);

  return <div className="mx-auto" ref={googleButtonRef}></div>;
};

export default GoogleOauth;