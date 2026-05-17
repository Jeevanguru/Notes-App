import { useState } from "react";

import { AuthContext } from "./AllContexts";

const AuthContextProvider = ( {children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [isVerified, setIsVerified] = useState(false);

    return (
        <AuthContext.Provider 
            value = {{
                isLoggedIn, 
                setLoggedIn, 
                isVerified, 
                setIsVerified
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;