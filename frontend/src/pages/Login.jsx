import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", senha: "" });
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleLogin = async () => {
        setErro("");
        if (!form.email || !form.senha) return setErro("Preencha todos os campos.");
        setCarregando(true);
        try {
            const res = await api.post("/auth/login", form);
            login(res.data.token, res.data.nome, res.data.papel);
            navigate("/");
        } catch (err) {
            setErro(err.response?.data?.erro || "Erro ao fazer login.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card card-dark p-4" style={{ width: "100%", maxWidth: 400 }}>
                <h4 className="mb-1 fw-bold" style={{ color: "#9d4edd" }}>GG Panel</h4>
                <p className="mb-4" style={{ fontSize: "0.85rem", color: "#9d4edd" }}>Faça login para continuar</p>

                {erro && <div className="alert alert-danger py-2">{erro}</div>}

                <div className="mb-3">
                    <label className="form-label" style={{ color: "#9d4edd" }}>E-mail</label>
                    <input
                        className="form-control bg-dark text-white border-secondary"
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label" style={{ color: "#9d4edd" }}>Senha</label>
                    <input
                        className="form-control bg-dark text-white border-secondary"
                        type="password"
                        placeholder="••••••••"
                        value={form.senha}
                        onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    />
                </div>

                <button className="btn btn-gg w-100 mb-3" onClick={handleLogin} disabled={carregando}>
                    {carregando ? "Entrando..." : "Entrar"}
                </button>

                <p className="text-center mb-0" style={{ fontSize: "0.85rem", color: "#9d4edd" }}>
                    Não tem conta?{" "}
                    <Link to="/cadastro" style={{ color: "#9d4edd" }}>Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
}
