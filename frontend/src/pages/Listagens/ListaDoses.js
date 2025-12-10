import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/lista-doses.css"; // <<< CSS da tabela

export default function ListaDoses() {
  const [doses, setDoses] = useState([]);

  const carregar = () => {
    axios.get("http://localhost:3001/doses").then(res => setDoses(res.data));
  };

  useEffect(() => {
    carregar();
  }, []);

  const remover = async (id) => {
    if (window.confirm("Deseja excluir esta dose?")) {
      await axios.delete(`http://localhost:3001/doses/${id}`);
      carregar();
    }
  };

  return (
    <div className="page">
      <h1>Listagem de Doses Aplicadas</h1>

      <table className="pagetabela-doses">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>CPF</th>
            <th>Vacina ID</th>
            <th>Data Aplicação</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {doses.map(d => (
            <tr key={d.id}>
              <td>{d.nome_paciente}</td>
              <td>{d.cpf_paciente}</td>
              <td>{d.vacina_id}</td>
              <td>{d.data_aplicacao}</td>
              <td>
                <button className="btn-delete" onClick={() => remover(d.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
