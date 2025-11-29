import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ListaUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ cnes:"", nome_fantasia:"", nome_empresarial:"", tipo_estabelecimento:"", subtipo:"", municipio:"", uf:"" });

  useEffect(() => { carregarUnidades(); }, []);

  async function carregarUnidades() {
    const res = await api.get("/unidades");
    setUnidades(res.data);
  }

  async function excluir(id) {
    if (window.confirm("Deseja excluir esta unidade?")) {
      await api.delete(`/unidades/${id}`);
      carregarUnidades();
    }
  }

  function iniciarEdicao(unidade) {
    setEditando(unidade.id);
    setForm(unidade);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    await api.put(`/unidades/${editando}`, form);
    setEditando(null);
    carregarUnidades();
  }

  return (
    <div className="page">
      <h2>Unidades de Saúde</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome Fantasia</th><th>Empresarial</th><th>CNES</th><th>Tipo</th><th>Subtipo</th><th>Município</th><th>UF</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map(u => (
            <tr key={u.id}>
              <td>{u.nome_fantasia}</td>
              <td>{u.nome_empresarial}</td>
              <td>{u.cnes}</td>
              <td>{u.tipo_estabelecimento}</td>
              <td>{u.subtipo}</td>
              <td>{u.municipio}</td>
              <td>{u.uf}</td>
              <td>
                <button onClick={() => iniciarEdicao(u)}>Editar</button>
                <button onClick={() => excluir(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <form onSubmit={salvarEdicao} className="form-card">
          <h3>Editando Unidade</h3>
          <label>Nome fantasia<input name="nome_fantasia" value={form.nome_fantasia} onChange={e => setForm({ ...form, nome_fantasia: e.target.value })} /></label>
          <label>Nome empresarial<input name="nome_empresarial" value={form.nome_empresarial} onChange={e => setForm({ ...form, nome_empresarial: e.target.value })} /></label>
          <label>CNES<input name="cnes" value={form.cnes} onChange={e => setForm({ ...form, cnes: e.target.value })} /></label>
          <label>Tipo<input name="tipo_estabelecimento" value={form.tipo_estabelecimento} onChange={e => setForm({ ...form, tipo_estabelecimento: e.target.value })} /></label>
          <label>Subtipo<input name="subtipo" value={form.subtipo} onChange={e => setForm({ ...form, subtipo: e.target.value })} /></label>
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