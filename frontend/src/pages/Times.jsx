import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

export default function Times() {
    const { usuario } = useAuth();
    const [times, setTimes] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        tag: "",
        jogo: "CS2",
        cor: "#9d4edd"
    });
    const [editandoId, setEditandoId] = useState(null);

    // When org user, set nome to organization name and keep it synced
    useEffect(() => {
        if (usuario?.papel === "org") {
            setForm(prev => ({ ...prev, nome: usuario.nome }));
        }
    }, [usuario]);


    const carregar = async () => {
        const res = await api.get("/times");
        setTimes(res.data);
    };

    useEffect(() => {
        carregar();
    }, []);

    const salvar = async () => {
        if (!form.nome.trim() || !form.tag.trim() || !form.jogo) {
            return alert("Preencha nome, TAG e jogo.");
        }

        if (editandoId) {
            try {
                await api.put(`/times/${editandoId}`, form);
            } catch (err) {
                if (err.response?.data?.error) {
                    alert(err.response.data.error);
                } else {
                    alert('Erro ao atualizar o time.');
                }
                return;
            }
        } else {
            try {
                await api.post("/times", form);
            } catch (err) {
                if (err.response?.data?.error) {
                    alert(err.response.data.error);
                }
                return;
            }
        }

        setForm(prev => ({
            nome: usuario?.papel === "org" ? usuario.nome : "",
            tag: usuario?.papel === "org" ? prev.tag : "",
            jogo: "CS2",
            cor: "#9d4edd"
        }));

        setEditandoId(null);
        carregar();
    };

    const editar = (time) => {
        setForm({
            nome: time.nome,
            tag: time.tag,
            jogo: time.jogo,
            cor: time.cor
        });

        setEditandoId(time.id);
    };

    const deletar = async (id) => {
        if (!window.confirm("Deletar este time?")) return;

        await api.delete(`/times/${id}`);
        carregar();
    };

    return (
        <div className="container">
            <h4
                className="mb-4"
                style={{ color: "#9d4edd" }}
            >
                Times
            </h4>

            <div className="card card-dark p-3 mb-4">
                <div className="row g-2">

                    <div className="col-md-2">
                        <input
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="TAG"
                            maxLength={5}
                            value={form.tag}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    tag: e.target.value.toUpperCase()
                                })
                            }
                        />
                    </div>

                    <div className="col-md-2">
                <input
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Nome do time"
                    value={form.nome}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            nome: e.target.value
                        })
                    }
                    disabled={usuario?.papel === "org"}
                />
                    </div>

                    <div className="col-md-5">
                        <select
                            className="form-select bg-dark text-white border-secondary"
                            value={form.jogo}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    jogo: e.target.value
                                })
                            }
                        >
                            <option value="CS2">
                                Counter-Strike 2 (CS2)
                            </option>

                            <option value="Valorant">
                                Valorant
                            </option>

                            <option value="League of Legends">
                                League of Legends
                            </option>

                            <option value="Teamfight Tactics">
                                Teamfight Tactics (TFT)
                            </option>

                            <option value="Dota 2">
                                Dota 2
                            </option>

                            <option value="Rocket League">
                                Rocket League
                            </option>

                            <option value="Rainbow Six Siege">
                                Rainbow Six Siege
                            </option>

                            <option value="PUBG">
                                PUBG
                            </option>

                            <option value="Free Fire">
                                Free Fire
                            </option>
                        </select>
                    </div>

                    <div className="col-md-1">
                        <input
                            type="color"
                            className="form-control form-control-color bg-dark border-secondary"
                            value={form.cor}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    cor: e.target.value
                                })
                            }
                            title="Cor do time"
                        />
                    </div>

                    <div className="col-md-2">
                        <button
                            className="btn btn-gg w-100"
                            onClick={salvar}
                        >
                            {editandoId
                                ? "Atualizar"
                                : "Adicionar"}
                        </button>
                    </div>

                </div>
            </div>

            <table className="table table-dark-custom table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cor</th>
                        <th>TAG</th>
                        <th>Nome</th>
                        <th>Jogo</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {times.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>

                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: 20,
                                            height: 20,
                                            borderRadius: "50%",
                                            backgroundColor: t.cor,
                                            border: "2px solid #666",
                                            boxShadow:
                                                "0 0 3px rgba(255,255,255,0.3)"
                                        }}
                                    />

                                </div>
                            </td>

                            <td>
                                <strong>{t.tag}</strong>
                            </td>

                            <td>{t.nome}</td>

                            <td>{t.jogo}</td>

                            <td>
                                <button
                                    className="btn btn-sm btn-outline-warning me-2"
                                    onClick={() => editar(t)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deletar(t.id)}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
