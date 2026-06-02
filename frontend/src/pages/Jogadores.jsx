import { useState, useEffect } from "react";
import api from "../services/api";

const FUNCOES_POR_JOGO = {
    "CS2": [
        "AWPer",
        "IGL",
        "Rifler",
        "Support",
        "Lurker"
    ],

    "Valorant": [
        "Duelist",
        "Initiator",
        "Controller",
        "Sentinel"
    ],

    "League of Legends": [
        "Top",
        "Jungle",
        "Mid",
        "ADC",
        "Support"
    ],

    "Dota 2": [
        "Carry",
        "Midlaner",
        "Offlaner",
        "Soft Support",
        "Hard Support"
    ],

    "Rocket League": [
        "Striker",
        "Support",
        "Defender"
    ],

    "Rainbow Six Siege": [
        "Entry Fragger",
        "Support",
        "Flex",
        "Roamer",
        "Anchor"
    ],

    "PUBG": [
        "IGL",
        "Fragger",
        "Scout",
        "Support"
    ],

    "Free Fire": [
        "Rusher",
        "Support",
        "Sniper",
        "Captain"
    ],

    "Teamfight Tactics": [
        "Jogador Solo"
    ]
};

export default function Jogadores() {
    const [jogadores, setJogadores] = useState([]);
    const [times, setTimes] = useState([]);

    const [form, setForm] = useState({
        nickname: "",
        nome_real: "",
        idade: "",
        pais: "Brasil",
        funcao: "",
        time_id: ""
    });

    const [editandoId, setEditandoId] = useState(null);

    const carregar = async () => {
        const jogadoresRes = await api.get("/jogadores");
        const timesRes = await api.get("/times");

        setJogadores(jogadoresRes.data);
        setTimes(timesRes.data);
    };

    useEffect(() => {
        carregar();
    }, []);

    const timeSelecionado = times.find(
        (t) => String(t.id) === String(form.time_id)
    );

    const jogoSelecionado = timeSelecionado?.jogo || "";

    const funcoesDisponiveis =
        FUNCOES_POR_JOGO[jogoSelecionado] || [];

    const salvar = async () => {

        if (!form.nickname.trim()) {
            return alert("Nickname é obrigatório.");
        }

        if (!form.nome_real.trim()) {
            return alert("Nome Real é obrigatório.");
        }

        if (
            !form.idade ||
            Number(form.idade) <= 0 ||
            Number(form.idade) > 100
        ) {
            return alert("A idade deve estar entre 1 e 100.");
        }

        const nicknameExiste = jogadores.some(
            (j) =>
                j.nickname.toLowerCase() ===
                form.nickname.toLowerCase() &&
                j.id !== editandoId
        );

        if (nicknameExiste) {
            return alert(
                "Já existe um jogador com esse nickname."
            );
        }

        if (editandoId) {
            await api.put(`/jogadores/${editandoId}`, form);
        } else {
            await api.post("/jogadores", form);
        }

        setForm({
            nickname: "",
            nome_real: "",
            idade: "",
            pais: "Brasil",
            funcao: "",
            time_id: ""
        });

        setEditandoId(null);
        carregar();
    };

    const editar = (j) => {
        setForm({
            nickname: j.nickname || "",
            nome_real: j.nome_real || "",
            idade: j.idade || "",
            pais: j.pais || "Brasil",
            funcao: j.funcao || "",
            time_id: j.time_id || ""
        });

        setEditandoId(j.id);
    };

    const deletar = async (id) => {
        if (!window.confirm("Deseja remover este jogador?")) {
            return;
        }

        await api.delete(`/jogadores/${id}`);
        carregar();
    };

    return (
        <div className="container">
            <h4 className="mb-4" style={{ color: "#9d4edd" }}>
                Jogadores
            </h4>

            <div className="card card-dark p-3 mb-4">
                <div className="row g-2">

                    <div className="col-md-3">
                        <input
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Nickname"
                            value={form.nickname}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    nickname: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-md-3">
                        <input
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Nome Real"
                            value={form.nome_real}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    nome_real: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="number"
                            min="1"
                            max="100"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Idade"
                            value={form.idade}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    idade: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select bg-dark text-white border-secondary"
                            value={form.pais}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    pais: e.target.value
                                })
                            }
                        >
                            <option>Brasil</option>
                            <option>Argentina</option>
                            <option>Chile</option>
                            <option>Uruguai</option>
                            <option>Estados Unidos</option>
                            <option>Canadá</option>
                            <option>Portugal</option>
                            <option>Espanha</option>
                            <option>França</option>
                            <option>Alemanha</option>
                            <option>Coreia do Sul</option>
                            <option>China</option>
                            <option>Japão</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <select
                            className="form-select bg-dark text-white border-secondary"
                            value={form.time_id}
                            onChange={(e) => {

                                const novoTimeId =
                                    e.target.value;

                                const novoTime =
                                    times.find(
                                        (t) =>
                                            String(t.id) ===
                                            String(novoTimeId)
                                    );

                                const novoJogo =
                                    novoTime?.jogo;

                                setForm({
                                    ...form,
                                    time_id: novoTimeId,
                                    funcao:
                                        FUNCOES_POR_JOGO[
                                        novoJogo
                                        ]?.[0] || ""
                                });
                            }}
                        >
                            <option value="">
                                Sem Time
                            </option>

                            {times.map((time) => (
                                <option
                                    key={time.id}
                                    value={time.id}
                                >
                                    [{time.tag}] {time.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <select
                            className="form-select bg-dark text-white border-secondary"
                            value={form.funcao}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    funcao: e.target.value
                                })
                            }
                            disabled={!form.time_id}
                        >
                            <option value="">
                                Selecione a função
                            </option>

                            {funcoesDisponiveis.map(
                                (funcao) => (
                                    <option
                                        key={funcao}
                                        value={funcao}
                                    >
                                        {funcao}
                                    </option>
                                )
                            )}
                        </select>
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
                        <th>ID</th>
                        <th>Nickname</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>País</th>
                        <th>Função</th>
                        <th>Time</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {jogadores.map((j) => (
                        <tr key={j.id}>
                            <td>{j.id}</td>
                            <td>{j.nickname}</td>
                            <td>{j.nome_real}</td>
                            <td>{j.idade}</td>
                            <td>{j.pais}</td>
                            <td>{j.funcao}</td>
                            <td>{j.time_nome || "-"}</td>

                            <td>
                                <button
                                    className="btn btn-sm btn-outline-warning me-2"
                                    onClick={() => editar(j)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deletar(j.id)}
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
