import React from 'react';
import { Link } from 'react-router-dom';


const Icon = ({ name }) => {
  const icons = {
    agentes: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    unidade: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-6 9 6v7a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1v-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    vacina: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M21 7l-4 4M3 21l1-4 11-11 4 4L8 21z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    transf: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M21 12h-18M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    rel: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 13h4v6H7zM13 7h4v12h-4z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    cfg: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7zM19.4 15a7.5 7.5 0 000-6l2.2-1.7-2-3.4L17 5a7.5 7.5 0 00-5-2l-.5-2.6h-4l-.5 2.6a7.5 7.5 0 00-5 2L1.5 3.9l-2 3.4L1.7 9a7.5 7.5 0 000 6l-2.2 1.7 2 3.4L7 19a7.5 7.5 0 005 2l.5 2.6h4l.5-2.6a7.5 7.5 0 005-2l3.8 1.1 2-3.4L19.4 15z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  };
  return <span className="icon-svg">{icons[name]}</span>;
};

export default function Dashboard() {
  const cards = [
    { to: '/agentes', label: 'Agentes', icon: 'agentes' },
    { to: '/unidades', label: 'Unidades de Saúde', icon: 'unidade' },
    { to: '/vacinas', label: 'Vacinas', icon: 'vacina' },
    { to: '/transferencias', label: 'Transferências', icon: 'transf' },
    { to: '/lista-agentes', label: 'Listar Agentes', icon: 'agentes' },
    { to: '/lista-unidades', label: 'Listar Unidades', icon: 'unidade' },
    { to: '/lista-vacinas', label: 'Listar Vacinas', icon: 'vacina' },
    { to: '/lista-transferencias', label: 'Listar Transferências', icon: 'transf' }
  ];

  return (
    <div className="page"
    >
      <div className="page-header">
        <h1>Bem vindo! Você está no Dose Certa</h1>
        <div className="search-box">
          <input placeholder="Buscar funcionalidades" />
        </div>
      </div>

      <h2 className="section-title">Gerenciamento</h2>
      <p className="muted">Aqui estão as funcionalidades do sistema.</p>

      <div className="cards-grid">
        {cards.map((c, i) => (
          <Link to={c.to} className="card" key={i}>
            <div className="card-ico"><Icon name={c.icon} /></div>
            <div className="card-label">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}