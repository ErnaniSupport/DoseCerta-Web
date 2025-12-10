import React, { useState } from 'react';
import api from '../services/api';
import styles from "../styles/cadastrarUnidade.module.css";

export default function CadastroUnidade() {

  const [form, setForm] = useState({
    cnes: '',
    nome_fantasia: '',
    nome_empresarial: '',
    tipo_estabelecimento: '',
    subtipo: '',
    municipio: '',
    uf: ''
  });

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();

    if (!form.nome_fantasia) {
      alert("Preencha Nome Fantasia");
      return;
    }

    try {
      await api.post("/unidades", form);
      alert("Unidade cadastrada!");

      setForm({
        cnes: '',
        nome_fantasia: '',
        nome_empresarial: '',
        tipo_estabelecimento: '',
        subtipo: '',
        municipio: '',
        uf: '',
      });

    } catch (err) {
      console.error(err);
      alert("Erro ao salvar.");
    }
  }

  return (
    <div className={styles.CadastroUnidade}>
      <h2>Cadastro de Unidade de Saúde</h2>

      <form className={styles["form-card"]} onSubmit={salvar}>

        <label>NOME FANTASIA
          <input name="nome_fantasia" value={form.nome_fantasia} onChange={handle} />
        </label>

        <label>NOME EMPRESARIAL
          <input name="nome_empresarial" value={form.nome_empresarial} onChange={handle} />
        </label>

        <label>CNES
          <input name="cnes" value={form.cnes} onChange={handle} />
        </label>

        <label>TIPO DE ESTABELECIMENTO
          <input name="tipo_estabelecimento" value={form.tipo_estabelecimento} onChange={handle} />
        </label>

        <label>SUBTIPO
          <input name="subtipo" value={form.subtipo} onChange={handle} />
        </label>

        <label>MUNICÍPIO
          <input name="municipio" value={form.municipio} onChange={handle} />
        </label>

        <label>UF
          <input
            name="uf"
            maxLength="2"
            value={form.uf}
            onChange={handle}
          />
        </label>

        <div className={styles["form-actions-botao"]}>
          <button type="submit" className={styles.primary}>Salvar</button>
        </div>

      </form>
    </div>
  );
}
