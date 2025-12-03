import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HistoricoImunizacao() {
  const [doses, setDoses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/doses").then(res => {
      setDoses(res.data);
    });
  }, []);

  return (
    <div className="page">
      <h1>Histórico de Imunização</h1>

      <div className="cards-grid">
        {doses.map(d => (
          <div className="card" key={d.id}>
            <div className="card-label">{d.nome_paciente}</div>
            <p className="muted">CPF: {d.cpf_paciente}</p>
            <p className="muted">Vacina ID: {d.vacina_id}</p>
            <p className="muted">Data: {d.data_aplicacao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
