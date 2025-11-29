import React, { useState } from 'react';
import api from '../services/api';

export default function CadastroUnidade(){
  const [form, setForm] = useState({
    cnes:'', nome_fantasia:'', nome_empresarial:'', tipo_estabelecimento:'', subtipo:'', municipio:'', uf:''
  });

  function h(e){ setForm({...form, [e.target.name]: e.target.value}) }

  async function salvar(e){
    e.preventDefault();
    if(!form.nome_fantasia) return alert('Preencha nome fantasia');
    try{
      await api.post('/unidades', form);
      alert('Unidade cadastrada');
      setForm({ cnes:'', nome_fantasia:'', nome_empresarial:'', tipo_estabelecimento:'', subtipo:'', municipio:'', uf:'' });
    }catch(err){
      console.error(err);
      alert('Erro');
    }
  }

  return (
    <div className="page">
      <h2>Cadastro de Unidade de Saúde</h2>
      <form className="form-card" onSubmit={salvar}>
        <label>Nome fantasia<input name="nome_fantasia" value={form.nome_fantasia} onChange={h} /></label>
        <label>Nome empresarial<input name="nome_empresarial" value={form.nome_empresarial} onChange={h} /></label>
        <label>CNES<input name="cnes" value={form.cnes} onChange={h} /></label>
        <label>Tipo<input name="tipo_estabelecimento" value={form.tipo_estabelecimento} onChange={h} /></label>
        <label>Subtipo<input name="subtipo" value={form.subtipo} onChange={h} /></label>
        <label>Município<input name="municipio" value={form.municipio} onChange={h} /></label>
        <label>UF<input name="uf" maxLength="2" value={form.uf} onChange={h} /></label>
        <div className="form-actions">
          <button className="primary" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}