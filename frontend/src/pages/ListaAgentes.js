import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ListaAgentes() {
  const [agentes, setAgentes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: "", cpf: "", cns: "", cbo: "", municipio: "", uf: "" });

  useEffect(() => { carregarAgentes(); }, []);

  async function carregarAgentes() {
    const res = await api.get("/agentes");
    setAgentes(res.data);
  }

  async function excluir(id) {
    if (window.confirm("Deseja excluir este agente?")) {
      await api.delete(`/agentes/${id}`);
      carregarAgentes();
    }
  }

  function iniciarEdicao(agente) {
    setEditando(agente.id);
    setForm(agente);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    await api.put(`/agentes/${editando}`, form);
    setEditando(null);
    carregarAgentes();
  }

  return (
    <div className="page">
      <h2>Agentes Cadastrados</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th><th>CPF</th><th>CNS</th><th>CBO</th><th>Município</th><th>UF</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agentes.map(a => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.cpf}</td>
              <td>{a.cns}</td>
              <td>{a.cbo}</td>
              <td>{a.municipio}</td>
              <td>{a.uf}</td>
              <td>
                <button onClick={() => iniciarEdicao(a)}>Editar</button>
                <button onClick={() => excluir(a.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <form onSubmit={salvarEdicao} className="form-card">
          <h3>Editando Agente</h3>
          <label>Nome<input name="nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></label>
          <label>CPF<input name="cpf" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} /></label>
          <label>CNS<input name="cns" value={form.cns} onChange={e => setForm({ ...form, cns: e.target.value })} /></label>
          <label>CBO<input name="cbo" value={form.cbo} onChange={e => setForm({ ...form, cbo: e.target.value })} /></label>
          <label>Município<input name="municipio" value={form.municipio} onChange={e => setForm({ ...form, municipio: e.target.value })} /></label>
          <label>UF<input name="uf" value={form.uf} onChange={e => setForm({ ...form, uf: e.target.value })} /></label>
          <div className="form-actions">
            <button type="submit" className="primary">Salvar</button>
            <button onClick={() => setEditando(null)} type="button">Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}