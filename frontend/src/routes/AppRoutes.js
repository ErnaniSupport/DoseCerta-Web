import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CadastroAgente from "../pages/CadastroAgente";
import CadastroUnidade from "../pages/CadastroUnidade";
import CadastroVacina from "../pages/CadastroVacina";
import TransferenciaVacina from "../pages/TransferenciaVacina";
import ListaAgentes from "../pages/ListaAgentes";
import ListaUnidades from "../pages/ListaUnidades";
import ListaVacinas from "../pages/ListaVacinas";
import ListaTransferencias from "../pages/ListaTransferencias";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, background: "#fff", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: 12 }}>Dashboard</Link>
        <Link to="/agentes" style={{ marginRight: 12 }}>Cadastro Agente</Link>
        <Link to="/unidades" style={{ marginRight: 12 }}>Cadastro Unidade</Link>
        <Link to="/vacinas" style={{ marginRight: 12 }}>Cadastro Vacina</Link>
        <Link to="/transferencias" style={{ marginRight: 12 }}>Transferência</Link>
        <Link to="/lista-agentes" style={{ marginRight: 12 }}>Agentes</Link>
        <Link to="/lista-unidades" style={{ marginRight: 12 }}>Unidades</Link>
        <Link to="/lista-vacinas" style={{ marginRight: 12 }}>Vacinas</Link>
        <Link to="/lista-transferencias">Transferências</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agentes" element={<CadastroAgente />} />
        <Route path="/unidades" element={<CadastroUnidade />} />
        <Route path="/vacinas" element={<CadastroVacina />} />
        <Route path="/transferencias" element={<TransferenciaVacina />} />
        <Route path="/lista-agentes" element={<ListaAgentes />} />
        <Route path="/lista-unidades" element={<ListaUnidades />} />
        <Route path="/lista-vacinas" element={<ListaVacinas />} />
        <Route path="/lista-transferencias" element={<ListaTransferencias />} />
      </Routes>
    </BrowserRouter>
  );
}