import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    // /-/-/ Ao carregar a página, verifica se já tem token salvo /-/-/
    useEffect(() => {
        const token = localStorage.getItem("ggpanel_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // /-/-/ Verifica se o token ainda não expirou /-/-/
                if (decoded.exp * 1000 > Date.now()) {
                    setUsuario({ token, nome: decoded.nome, papel: decoded.papel });
                } else {
                    localStorage.removeItem("ggpanel_token");
                }
            } catch {
                localStorage.removeItem("ggpanel_token");
            }
        }
    }, []);

    function login(token, nome, papel) {
        localStorage.setItem("ggpanel_token", token);
        setUsuario({ token, nome, papel });
    }

    function logout() {
        localStorage.removeItem("ggpanel_token");
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
