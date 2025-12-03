import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/alertas.css";

export default function AlertasVencimento() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/vacinas").then(res => {
      const hoje = new Date();
      const limite = new Date();
      limite.setDate(hoje.getDate() + 30);

      const proximas = res.data.filter(v => {
        const validade = new Date(v.validade);
        return validade <= limite;
      });

      setAlertas(proximas);
    });
  }, []);

  // Função para calcular cor
  const getStatusColor = validade => {
    const hoje = new Date();
    const v = new Date(validade);
    const diff = (v - hoje) / (1000 * 60 * 60 * 24);

    if (diff < 0) return "vermelho";       // já venceu
    if (diff <= 7) return "laranja";       // vence em poucos dias
    return "amarelo";                      // vence dentro de 30 dias
  };

  return (
    <div className="page">
      <h1>Alertas de Vacinas</h1>
      <p className="muted">Vacinas que vencem dentro de 30 dias.</p>

      <div className="alert-grid">
        {alertas.map(v => (
          <div className={`alert-card ${getStatusColor(v.validade)}`} key={v.id}>
            <div className="alert-title">{v.nome_vacina}</div>

            <p><strong>Validade:</strong> {v.validade}</p>
            <p><strong>Quantidade:</strong> {v.quantidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
