import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Cadastro() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nome: "", email: "", senha: "", papel: "" });
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleCadastro = async () => {
        setErro("");
        if (!form.nome || !form.email || !form.senha || !form.papel) {
            return setErro("Preencha todos os campos.");
        }
        setCarregando(true);
        try {
            await api.post("/auth/register", form);
            navigate("/login");
        } catch (err) {
            setErro(err.response?.data?.erro || "Erro ao cadastrar.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card card-dark p-4" style={{ width: "100%", maxWidth: 420 }}>
                <h4 className="mb-1 fw-bold" style={{ color: "#9d4edd" }}>GG Panel</h4>
                <p className="text-muted mb-4" style={{ fontSize: "0.85rem" }}>Crie sua conta</p>

                {erro && <div className="alert alert-danger py-2">{erro}</div>}

                <div className="mb-3">
                    <label className="form-label text-muted">Nome</label>
                    <input
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Seu nome ou nome da org"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-muted">E-mail</label>
                    <input
                        className="form-control bg-dark text-white border-secondary"
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-muted">Senha</label>
                    <input
                        className="form-control bg-dark text-white border-secondary"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={form.senha}
                        onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label text-muted">Tipo de conta</label>
                    <select
                        className="form-select bg-dark text-white border-secondary"
                        value={form.papel}
                        onChange={(e) => setForm({ ...form, papel: e.target.value })}
                    >
                        <option value="">Selecione...</option>
                        <option value="org">Time / ORG — Gerencio meu time e jogadores</option>
                        <option value="organizador">Organizador — crio e gerencio torneios</option>
                    </select>
                </div>

                <button className="btn btn-gg w-100 mb-3" onClick={handleCadastro} disabled={carregando}>
                    {carregando ? "Cadastrando..." : "Criar conta"}
                </button>

                <p className="text-center text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                    Já tem conta?{" "}
                    <Link to="/login" style={{ color: "#9d4edd" }}>Entrar</Link>
                </p>
            </div>
        </div>
    );
}
