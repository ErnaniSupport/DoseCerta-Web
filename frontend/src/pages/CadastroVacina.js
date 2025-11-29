import React, { useState } from 'react';
import api from '../services/api';

export default function CadastroVacina() {
  const [form, setForm] = useState({
    nome_vacina: '', tipo: '', fabricante: '', lote: '', validade: '', quantidade: 0, nome_agente: '', cpf_agente: ''
  });

  function h(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  async function salvar(e) {
    e.preventDefault();
    if (!form.nome_vacina || !form.lote) return alert('Preencha nome e lote');
    try {
      const payload = {
        nome_vacina: form.nome_vacina,
        fabricante: form.fabricante,
        lote: form.lote,
        validade: form.validade,
        protecao: form.tipo,
        quantidade: Number(form.quantidade),
        data_cadastro: new Date().toISOString().split("T")[0],
        nome_agente: form.nome_agente,
        cpf_agente: form.cpf_agente
      };

      await api.post('/vacinas', payload);
      alert('Vacina cadastrada');
      setForm({ nome_vacina: '', tipo: '', fabricante: '', lote: '', validade: '', quantidade: 0, nome_agente: '', cpf_agente: '' });
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar');
    }
  }

  return (
    <div className="page">
      <h2>Cadastro de Vacina</h2>
      <form className="form-card" onSubmit={salvar}>
        <label>Nome da vacina<input name="nome_vacina" value={form.nome_vacina} onChange={h} /></label>
        <label>Tipo<input name="tipo" value={form.tipo} onChange={h} /></label>
        <label>Fabricante<input name="fabricante" value={form.fabricante} onChange={h} /></label>
        <label>Lote<input name="lote" value={form.lote} onChange={h} /></label>
        <label>Validade<input type="date" name="validade" value={form.validade} onChange={h} /></label>
        <label>Quantidade<input type="number" name="quantidade" value={form.quantidade} onChange={h} /></label>
        <label>Nome do agente<input name="nome_agente" value={form.nome_agente} onChange={h} /></label>
        <label>CPF do agente<input name="cpf_agente" value={form.cpf_agente} onChange={h} /></label>
        <div className="form-actions">
          <button className="primary" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}