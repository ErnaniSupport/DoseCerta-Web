import React, { useState, useEffect } from 'react';
import api from '../services/api';
import styles from "../styles/transferenciaVacina.module.css";

export default function TransferenciaVacina() {
  const [form, setForm] = useState({
    vacina_id: '',
    estabelecimento_origem: '',
    estabelecimento_destino: '',
    quantidade_transferida: 0,
    data_transferencia: '',
    nome_agente: '',
    cpf_agente: ''
  });

  const [vacinas, setVacinas] = useState([]);
  const [postos, setPostos] = useState([]);

  useEffect(() => {
    api.get('/vacinas')
      .then(r => setVacinas(r.data))
      .catch(() => { });

    api.get('/unidades')
      .then(r => setPostos(r.data))
      .catch(() => { });
  }, []);

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();

    if (!form.vacina_id || !form.estabelecimento_origem || !form.estabelecimento_destino) {
      return alert('Selecione vacina e postos');
    }

    if (Number(form.quantidade_transferida) <= 0) {
      return alert('Quantidade inválida');
    }

    try {
      await api.post('/transferencias', form);
      alert('Transferência registrada com sucesso!');

      setForm({
        vacina_id: '',
        estabelecimento_origem: '',
        estabelecimento_destino: '',
        quantidade_transferida: 0,
        data_transferencia: '',
        nome_agente: '',
        cpf_agente: ''
      });

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Erro ao registrar transferência');
    }
  }

  return (
    <div className={styles.TransferenciaVacina}>

      <form className={styles["form-card"]} onSubmit={salvar}>
        <h2 className={styles.title}>Transferência de Vacinas</h2>
        
        <label>Vacina
          <select name="vacina_id" value={form.vacina_id} onChange={handle}>
            <option value="">Selecione</option>
            {vacinas.map(v => (
              <option key={v.id} value={v.id}>
                {v.nome_vacina} — {v.lote} (qtd: {v.quantidade})
              </option>
            ))}
          </select>
        </label>

        <label>Origem
          <select name="estabelecimento_origem" value={form.estabelecimento_origem} onChange={handle}>
            <option value="">Selecione origem</option>
            {postos.map(p => (
              <option key={p.id} value={p.id}>{p.nome_fantasia}</option>
            ))}
          </select>
        </label>

        <label>Destino
          <select name="estabelecimento_destino" value={form.estabelecimento_destino} onChange={handle}>
            <option value="">Selecione destino</option>
            {postos.map(p => (
              <option key={p.id} value={p.id}>{p.nome_fantasia}</option>
            ))}
          </select>
        </label>

        <label>Quantidade transferida
          <input
            type="number"
            name="quantidade_transferida"
            value={form.quantidade_transferida}
            onChange={handle}
          />
        </label>

        <label>Data da transferência
          <input
            type="date"
            name="data_transferencia"
            value={form.data_transferencia}
            onChange={handle}
          />
        </label>

        <label>Nome do agente
          <input name="nome_agente" value={form.nome_agente} onChange={handle} />
        </label>

        <label>CPF do agente
          <input name="cpf_agente" value={form.cpf_agente} onChange={handle} />
        </label>

        <div className={styles["form-actions"]}>
          <button type="submit" className={styles.primary}>
            Registrar transferência
          </button>
        </div>

      </form>
    </div>
  );
}
