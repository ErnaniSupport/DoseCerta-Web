import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function TransferenciaVacina(){
  const [form, setForm] = useState({
    vacina_id:'', estabelecimento_origem:'', estabelecimento_destino:'', quantidade_transferida:0, data_transferencia:'', nome_agente:'', cpf_agente:''
  });
  const [vacinas, setVacinas] = useState([]);
  const [postos, setPostos] = useState([]);

  useEffect(()=>{
    api.get('/vacinas').then(r=>setVacinas(r.data)).catch(()=>{});
    api.get('/unidades').then(r=>setPostos(r.data)).catch(()=>{});
  }, []);

  function h(e){ setForm({...form, [e.target.name]: e.target.value}) }

  async function salvar(e){
    e.preventDefault();
    if(!form.vacina_id || !form.estabelecimento_origem || !form.estabelecimento_destino) return alert('Selecione vacina e postos');
    if(Number(form.quantidade_transferida) <= 0) return alert('Quantidade inválida');

    try{
      await api.post('/transferencias', form);
      alert('Transferência registrada');
      setForm({ vacina_id:'', estabelecimento_origem:'', estabelecimento_destino:'', quantidade_transferida:0, data_transferencia:'', nome_agente:'', cpf_agente:'' });
    }catch(err){
      console.error(err);
      alert(err?.response?.data?.error || 'Erro ao registrar transferência');
    }
  }

  return (
    <div className="page">
      <h2>Transferência de Vacinas</h2>
      <form className="form-card" onSubmit={salvar}>
        <label>Vacina
          <select name="vacina_id" value={form.vacina_id} onChange={h}>
            <option value="">Selecione</option>
            {vacinas.map(v => <option key={v.id} value={v.id}>{v.nome_vacina} — {v.lote} (qtd: {v.quantidade})</option>)}
          </select>
        </label>

        <label>Origem
          <select name="estabelecimento_origem" value={form.estabelecimento_origem} onChange={h}>
            <option value="">Selecione origem</option>
            {postos.map(p => <option key={p.id} value={p.id}>{p.nome_fantasia}</option>)}
          </select>
        </label>

        <label>Destino
          <select name="estabelecimento_destino" value={form.estabelecimento_destino} onChange={h}>
            <option value="">Selecione destino</option>
            {postos.map(p => <option key={p.id} value={p.id}>{p.nome_fantasia}</option>)}
          </select>
        </label>

        <label>Quantidade
          <input type="number" name="quantidade_transferida" value={form.quantidade_transferida} onChange={h} />
        </label>

        <label>Data da transferência
          <input type="date" name="data_transferencia" value={form.data_transferencia} onChange={h} />
        </label>

        <label>Nome do agente<input name="nome_agente" value={form.nome_agente} onChange={h} /></label>
        <label>CPF do agente<input name="cpf_agente" value={form.cpf_agente} onChange={h} /></label>

        <div className="form-actions">
          <button className="primary" type="submit">Registrar transferência</button>
        </div>
      </form>
    </div>
  );
}