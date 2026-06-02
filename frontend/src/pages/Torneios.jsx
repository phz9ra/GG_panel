import { useState, useEffect } from "react";
import api from "../services/api";

export default function Torneios() {
    const [torneios, setTorneios] = useState([]);
    const [times, setTimes] = useState([]);

    const [form, setForm] = useState({
        nome: "",
        jogo: "CS2",
        data_inicio: "",
        data_fim: "",
        status: "Planejado",
        premiacao: "",
        participantes: []
    });

    const [editandoId, setEditandoId] = useState(null);

    const carregar = async () => {
        const torneiosRes = await api.get("/torneios");
        const timesRes = await api.get("/times");

        setTorneios(torneiosRes.data);
        setTimes(timesRes.data);
    };

    useEffect(() => {
        carregar();
    }, []);

    const salvar = async () => {

        if (!form.nome.trim()) {
            return alert("Nome do torneio é obrigatório.");
        }

        if (editandoId) {
            await api.put(`/torneios/${editandoId}`, form);
        } else {
            await api.post("/torneios", form);
        }

        setForm({
            nome: "",
            jogo: "CS2",
            data_inicio: "",
            data_fim: "",
            status: "Planejado",
            premiacao: "",
            participantes: []
        });

        setEditandoId(null);
        carregar();
    };

    const editar = (torneio) => {

        setForm({
            nome: torneio.nome,
            jogo: torneio.jogo,
            data_inicio: torneio.data_inicio || "",
            data_fim: torneio.data_fim || "",
            status: torneio.status,
            premiacao: torneio.premiacao || "",
            participantes:
                torneio.participantes?.map((p) => p.id) || []
        });

        setEditandoId(torneio.id);
    };

    const deletar = async (id) => {

        if (!window.confirm("Excluir torneio?")) {
            return;
        }

        await api.delete(`/torneios/${id}`);
        carregar();
    };

    const toggleParticipante = (timeId) => {

        if (form.participantes.includes(timeId)) {

            setForm({
                ...form,
                participantes: form.participantes.filter(
                    (id) => id !== timeId
                )
            });

        } else {

            setForm({
                ...form,
                participantes: [
                    ...form.participantes,
                    timeId
                ]
            });
        }
    };

    return (
        <div className="container">

            <h4
                className="mb-4"
                style={{ color: "#9d4edd" }}
            >
                Torneios
            </h4>

            <div className="card card-dark p-3 mb-4">

                <div className="row g-2">

                    <div className="col-md-4">
                        <input
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Nome do torneio"
                            value={form.nome}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    nome: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-md-3">
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
                            <option value="CS2">CS2</option>
                            <option value="Valorant">Valorant</option>
                            <option value="League of Legends">League of Legends</option>
                            <option value="Teamfight Tactics">TFT</option>
                            <option value="Dota 2">Dota 2</option>
                            <option value="Rocket League">Rocket League</option>
                            <option value="Rainbow Six Siege">Rainbow Six Siege</option>
                            <option value="PUBG">PUBG</option>
                            <option value="Free Fire">Free Fire</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control bg-dark text-white border-secondary"
                            value={form.data_inicio}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    data_inicio: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control bg-dark text-white border-secondary"
                            value={form.data_fim}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    data_fim: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-md-3">
                        <input
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Premiação"
                            value={form.premiacao}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    premiacao: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-md-3">
                        <select
                            className="form-select bg-dark text-white border-secondary"
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status: e.target.value
                                })
                            }
                        >
                            <option>Planejado</option>
                            <option>Ativo</option>
                            <option>Finalizado</option>
                        </select>
                    </div>

                </div>

                <hr />

                <h6>Times Participantes</h6>

                <div className="row">

                    {times.map((time) => (

                        <div
                            className="col-md-3 mb-2"
                            key={time.id}
                        >
                            <div
                                className="form-check"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={form.participantes.includes(time.id)}
                                    onChange={() =>
                                        toggleParticipante(time.id)
                                    }
                                />

                                <label
                                    className="form-check-label"
                                >
                                    [{time.tag}] {time.nome}
                                </label>
                            </div>
                        </div>

                    ))}

                </div>

                <button
                    className="btn btn-gg mt-3"
                    onClick={salvar}
                >
                    {editandoId
                        ? "Atualizar"
                        : "Adicionar"}
                </button>

            </div>

            <table className="table table-dark-custom table-hover">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Jogo</th>
                        <th>Status</th>
                        <th>Participantes</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>

                    {torneios.map((t) => (

                        <tr key={t.id}>

                            <td>{t.id}</td>

                            <td>{t.nome}</td>

                            <td>{t.jogo}</td>

                            <td>{t.status}</td>

                            <td>
                                {t.participantes?.map((p) =>
                                    `[${p.tag}]`
                                ).join(" ")}
                            </td>

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
