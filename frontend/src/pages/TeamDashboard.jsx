import { useEffect, useState } from "react";
import api from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function TeamDashboard() {
    const [dados, setDados] = useState(null);

    const carregar = async () => {
        const res = await api.get("/dashboard/time");
        setDados(res.data);
    };

    useEffect(() => {
        carregar();
    }, []);

    if (!dados) {
        return (
            <div className="container">
                <h4>Carregando Dashboard...</h4>
            </div>
        );
    }

    return (
        <div className="container">
            <h3 className="mb-4" style={{ color: "#9d4edd" }}>
                Dashboard da Organização
            </h3>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card card-dark p-3 text-center">
                        <h5>Total de Times</h5>
                        <h2>{dados.totalTimes}</h2>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card card-dark p-3 text-center">
                        <h5>Total de Jogadores</h5>
                        <h2>{dados.totalJogadores}</h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card card-dark p-3 mb-4">
                        <h5 className="mb-3">
                            Nacionalidade dos Jogadores
                        </h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dados.nacionalidades}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="pais" stroke="#f3f4f6" />
                                <YAxis stroke="#f3f4f6" />
                                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#f3f4f6' }} />
                                <Bar dataKey="total" fill="#9d4edd" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
