import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// /-/-/ papelNecessario: "org" | "organizador" | null (qualquer autenticado) /-/-/
export default function PrivateRoute({ children, papelNecessario }) {
    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (papelNecessario && usuario.papel !== papelNecessario) {
        return <Navigate to="/" replace />;
    }

    return children;
}
