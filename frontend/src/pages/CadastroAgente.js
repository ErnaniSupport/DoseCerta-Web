import React, { useState } from 'react';
import api from '../services/api';
import styles from "../styles/cadastrarAgentes.module.css"; 

export default function CadastroAgente() {
  const [form, setForm] = useState({
    nome: '', cpf: '', cns: '', cbo: '', municipio: '', uf: ''
  });

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();
    if (!form.nome || !form.cpf) {
      alert('Preencha nome e CPF');
      return;
    }
    try {
      await api.post('/agentes', form);
      alert('Agente cadastrado!');
      setForm({ nome: '', cpf: '', cns: '', cbo: '', municipio: '', uf: '' });
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar');
    }
  }

  return (
    <div className={styles.CadastroAgente}>
      <h2>Cadastro de Agente</h2>

      <form className={styles["form-card"]} onSubmit={salvar}>

        <label>Nome
          <input name="nome" value={form.nome} onChange={handle} />
        </label>

        <label>CPF
          <input name="cpf" value={form.cpf} onChange={handle} />
        </label>

        <label>CNS
          <input name="cns" value={form.cns} onChange={handle} />
        </label>

        <label>CBO
          <input name="cbo" value={form.cbo} onChange={handle} />
        </label>

        <label>Município
          <input name="municipio" value={form.municipio} onChange={handle} />
        </label>

        <label>UF
          <input name="uf" maxLength="2" value={form.uf} onChange={handle} />
        </label>

        <div className={styles["form-actions"]}>
          <button type="submit" className={styles.primary}>Salvar</button>
        </div>

      </form>
    </div>
  );
}
