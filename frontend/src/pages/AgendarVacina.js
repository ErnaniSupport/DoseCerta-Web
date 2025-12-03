import React, { useState } from "react";
import axios from "axios";

export default function Agendarvacina() {
  const [agendamento, setAgendamento] = useState({
    nome_paciente: "",
    cpf_paciente: "",
    data: "",
    vacina: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/agendamentos", agendamento);
    alert("Agendamento criado!");
  };

  return (
    <div className="page">
      <h1>Agendar Vacina</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>Nome do Paciente</label>
        <input
          value={agendamento.nome_paciente}
          onChange={e => setAgendamento({ ...agendamento, nome_paciente: e.target.value })}
        />

        <label>CPF do Paciente</label>
        <input
          value={agendamento.cpf_paciente}
          onChange={e => setAgendamento({ ...agendamento, cpf_paciente: e.target.value })}
        />

        <label>Data</label>
        <input
          type="date"
          value={agendamento.data}
          onChange={e => setAgendamento({ ...agendamento, data: e.target.value })}
        />

        <label>Vacina</label>
        <input
          value={agendamento.vacina}
          onChange={e => setAgendamento({ ...agendamento, vacina: e.target.value })}
        />

        <button className="btn">Salvar</button>
      </form>
    </div>
  );
}
