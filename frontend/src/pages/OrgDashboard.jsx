import { useEffect, useState } from "react";
import api from "../services/api";

export default function OrgDashboard() {
  const [dados, setDados] = useState(null);

  const carregar = async () => {
    const res = await api.get("/dashboard/organizador");
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
        Dashboard do Organizador
      </h3>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card card-dark p-3 text-center">
            <h5>Qtd Campeonatos</h5>
            <h2>{dados.totalTorneios}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-dark p-3 text-center">
            <h5>Participantes (Times)</h5>
            <h2>{dados.totalParticipantes}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-dark p-3 text-center">
            <h5>Times Registrados</h5>
            <h2>{dados.totalTimes}</h2>
          </div>
        </div>
      </div>
      <div className="card card-dark p-3">
        <h5 className="mb-3">Últimos Torneios</h5>
        <table className="table table-dark-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Jogo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dados.ultimosTorneios.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nome}</td>
                <td>{t.jogo}</td>
                <td>{t.status}</td>
              </tr>
            ))}
            {dados.ultimosTorneios.length === 0 && (
                <tr>
                    <td colSpan="4" className="text-center text-muted">Nenhum torneio registrado.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
