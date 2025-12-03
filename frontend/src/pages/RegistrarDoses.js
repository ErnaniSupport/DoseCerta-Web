import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegistrarDoses() {
  const [vacinas, setVacinas] = useState([]);
  const [dados, setDados] = useState({
    vacina_id: "",
    nome_paciente: "",
    cpf_paciente: "",
    data_aplicacao: "",
    lote: ""
    
  });


  useEffect(() => {
    axios.get("http://localhost:3001/vacinas").then(res => {
      setVacinas(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/doses", dados);

    alert("Dose registrada com sucesso!");
  };

  return (
    <div className="page">
      <h1>Registrar Dose Aplicada</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>Vacina</label>
        <select
          value={dados.vacina_id}
          onChange={(e) => setDados({ ...dados, vacina_id: e.target.value })}
        >
          <option>Selecione</option>
          {vacinas.map(v => (
            <option key={v.id} value={v.id}>{v.nome_vacina}</option>
          ))}
        </select>

        <label>Nome do Paciente</label>
        <input
          value={dados.nome_paciente}
          onChange={(e) => setDados({ ...dados, nome_paciente: e.target.value })}
        />

        <label>CPF do Paciente</label>
        <input
          value={dados.cpf_paciente}
          onChange={(e) => setDados({ ...dados, cpf_paciente: e.target.value })}
        />

        <label>Data da Aplicação</label>
        <input
          type="date"
          value={dados.data_aplicacao}
          onChange={(e) => setDados({ ...dados, data_aplicacao: e.target.value })}
        />

        <label>Lote</label>
        <input
          value={dados.lote}
          onChange={(e) => setDados({ ...dados, lote: e.target.value })}
        />

        <button className="btn">Salvar</button>
      </form>
    </div>
  );
}
