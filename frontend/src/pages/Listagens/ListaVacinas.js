import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./../../styles/Listagem/listarVacinas.css"; // 🔵 você pode usar o mesmo CSS da outra tabela

export default function ListaVacinas() {
  const [vacinas, setVacinas] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nome_vacina: "",
    fabricante: "",
    lote: "",
    validade: "",
    protecao: "",
    quantidade: 0,
    data_cadastro: "",
    nome_agente: "",
    cpf_agente: ""
  });

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const res = await api.get("/vacinas");
    setVacinas(res.data);
  }

  async function excluir(id) {
    if (window.confirm("Deseja excluir esta vacina?")) {
      await api.delete(`/vacinas/${id}`);
      carregar();
    }
  }

  function iniciarEdicao(v) {
    setEditando(v.id);
    setForm(v);
  }

  async function salvarEdicao(e) {
    e.preventDefault();

    const payload = {
      ...form,
      quantidade: Number(form.quantidade)
    };

    await api.put(`/vacinas/${editando}`, payload);
    setEditando(null);
    carregar();
  }

  return (
    <div className="pageListaVacina">
      <h2>Vacinas Cadastradas</h2>

      <table className="tabela-doses">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Fabricante</th>
            <th>Lote</th>
            <th>Validade</th>
            <th>Quantidade</th>
            <th>Agente</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {vacinas.map((v) => (
            <tr key={v.id}>
              <td>{v.nome_vacina}</td>
              <td>{v.fabricante}</td>
              <td>{v.lote}</td>
              <td>{v.validade}</td>
              <td>{v.quantidade}</td>
              <td>{v.nome_agente}</td>

              <td style={{ display: "flex", gap: "10px" }}>
                <button className="btn-edit" onClick={() => iniciarEdicao(v)}>
                  Editar
                </button>

                <button className="btn-delete" onClick={() => excluir(v.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="form-card">
          <h3>Editando Vacina</h3>

          <label>
            Nome
            <input
              name="nome_vacina"
              value={form.nome_vacina}
              onChange={(e) =>
                setForm({ ...form, nome_vacina: e.target.value })
              }
            />
          </label>

          <label>
            Fabricante
            <input
              name="fabricante"
              value={form.fabricante}
              onChange={(e) =>
                setForm({ ...form, fabricante: e.target.value })
              }
            />
          </label>

          <label>
            Lote
            <input
              name="lote"
              value={form.lote}
              onChange={(e) => setForm({ ...form, lote: e.target.value })}
            />
          </label>

          <label>
            Validade
            <input
              type="date"
              name="validade"
              value={form.validade}
              onChange={(e) => setForm({ ...form, validade: e.target.value })}
            />
          </label>

          <label>
            Proteção
            <input
              name="protecao"
              value={form.protecao}
              onChange={(e) =>
                setForm({ ...form, protecao: e.target.value })
              }
            />
          </label>

          <label>
            Quantidade
            <input
              type="number"
              name="quantidade"
              value={form.quantidade}
              onChange={(e) =>
                setForm({ ...form, quantidade: e.target.value })
              }
            />
          </label>

          <label>
            Nome do Agente
            <input
              name="nome_agente"
              value={form.nome_agente}
              onChange={(e) =>
                setForm({ ...form, nome_agente: e.target.value })
              }
            />
          </label>

          <label>
            CPF do Agente
            <input
              name="cpf_agente"
              value={form.cpf_agente}
              onChange={(e) =>
                setForm({ ...form, cpf_agente: e.target.value })
              }
            />
          </label>

          <div className="form-actions">
            <button className="btn-edit" onClick={salvarEdicao}>
              Salvar
            </button>

            <button className="btn-delete" onClick={() => setEditando(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
