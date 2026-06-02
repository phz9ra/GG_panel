import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();

    // /-/-/ Links visíveis por papel /-/-/
    const linksOrg = [
        { path: "/", label: "Dashboard" },
        { path: "/times", label: "Times" },
        { path: "/jogadores", label: "Jogadores" },
    ];

    const linksOrganizador = [
        { path: "/", label: "Dashboard" },
        { path: "/torneios", label: "Torneios" },
        { path: "/times", label: "Times" },
    ];

    const links = usuario?.papel === "org" ? linksOrg : linksOrganizador;

    const handleLogout = () => {
        if (window.confirm("Tem certeza que deseja deslogar e ir para a página de login novamente?")) {
            logout();
            navigate("/login");
        }
    };

    // /-/-/ Não exibe navbar em páginas públicas ou de autenticação /-/-/
    if (!usuario || location.pathname === "/login" || location.pathname === "/cadastro") return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark-custom px-4 mb-4 d-flex justify-content-between">
            <span className="navbar-brand fw-bold" style={{ color: "#9d4edd", fontSize: "1.4rem" }}>
                GG Panel
            </span>

            <div className="d-flex gap-3 align-items-center">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="nav-link"
                        style={{
                            color: location.pathname === link.path ? "#9d4edd" : "#aaa",
                            fontWeight: location.pathname === link.path ? "bold" : "normal",
                        }}
                    >
                        {link.label}
                    </Link>
                ))}

                <span className="text-white fw-medium me-3">
                    {usuario.nome} · <span style={{ color: "#9d4edd" }}>{usuario.papel === "org" ? "Time" : "Organizador"}</span>
                </span>

                <button className="btn btn-sm btn-outline-secondary" onClick={handleLogout}>
                    Sair
                </button>
            </div>
        </nav>
    );
}
