import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import jwtDecode from "jwt-decode";

interface AuthInterface {
    isAuthenticated: boolean;
    logout: boolean;
    token: {
        accessToken: string;
    };
    isSuperUser: boolean;
    setAuthState?: React.Dispatch<React.SetStateAction<AuthInterface>>;
}

export const initialAuthState: AuthInterface = {
    isAuthenticated: false,
    logout: false,
    isSuperUser: false,
    token: {
        accessToken: "",
    },
}

const AuthContext = createContext<AuthInterface>(initialAuthState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [authState, setAuthState] = useState<AuthInterface>(() => {
        const storedAuthState = localStorage.getItem('authState');

        return storedAuthState ? JSON.parse(storedAuthState) : initialAuthState;
    });

    useEffect(() => {
        // Store the authState in local storage whenever it changes
        localStorage.setItem('authState', JSON.stringify(authState));
    }, [authState]);

    useEffect(() => {
        if (authState.logout) {
            logoutHandler();
        }
    }, [authState.logout]);

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = authState.token.accessToken;
            if (token) {
                try {
                    const decodedToken: any = jwtDecode(token);
                    const currentTime = Date.now() / 1000;  // Convert to seconds

                    setAuthState({
                        ...authState,
                        isAuthenticated: true,
                        isSuperUser: decodedToken?.roles?.includes("SUPER_USER")
                    });

                    if (decodedToken.exp < currentTime) {
                        // Token has expired
                        setAuthState({
                            ...authState,
                            isAuthenticated: false,
                            token: {
                                accessToken: "",
                            },
                            logout: true
                        });
                    }
                } catch (e) {
                    console.error("Error decoding token:", e);
                }
            }
        };

        // Check token expiration immediately upon mount
        checkTokenExpiration();
    }, [authState]);

    const logoutHandler = () => {
        if (setAuthState) {
            setAuthState(initialAuthState);
        }
        //     Remove all local storage
        localStorage.clear();

        // Redirect to home page
        window.location.href = "/";
    }

    const value = useMemo(() => {
        return {
            ...authState,
            setAuthState
        }
    }, [authState])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}