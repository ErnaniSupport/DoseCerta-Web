import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// PRINCIPAIS
import Dashboard from "../pages/Dashboard";
import CadastroAgente from "../pages/CadastroAgente";
import CadastroUnidade from "../pages/CadastroUnidade";
import CadastroVacina from "../pages/CadastroVacina";
import TransferenciaVacina from "../pages/TransferenciaVacina";

// LISTAGENS
import ListaAgentes from "../pages/Listagens/ListaAgentes";
import ListaUnidades from "../pages/Listagens/ListaUnidades";
import ListaVacinas from "../pages/Listagens/ListaVacinas";
import ListaTransferencias from "../pages/Listagens/ListaTransferencias";
import ListaDoses from "../pages/Listagens/ListaDoses";
import ListaAgendamentos from "../pages/Listagens/ListaAgendamentos";


// NOVAS FUNÇÕES
import RegistrarDoses from "../pages/RegistrarDoses";
import AlertasVencimento from "../pages/AlertasVencimento";
import AgendarVacina from "../pages/AgendarVacina";
import HistoricoImunizacao from "../pages/HistoricoImunizacao";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, background: "#fff", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: 12 }}>Dashboard</Link>
        <Link to="/agentes" style={{ marginRight: 12 }}>Cadastro Agente</Link>
        <Link to="/unidades" style={{ marginRight: 12 }}>Cadastro Unidade</Link>
        <Link to="/vacinas" style={{ marginRight: 12 }}>Cadastro Vacina</Link>
        <Link to="/transferencias" style={{ marginRight: 12 }}>Transferência</Link>

        {/* LISTAGENS */}
        <Link to="/lista-agentes" style={{ marginRight: 12 }}>Agentes</Link>
        <Link to="/lista-unidades" style={{ marginRight: 12 }}>Unidades</Link>
        <Link to="/lista-vacinas" style={{ marginRight: 12 }}>Vacinas</Link>
        <Link to="/lista-transferencias" style={{ marginRight: 12 }}>Transferências</Link>
      </nav>

      <Routes>
        {/* PRINCIPAL */}
        <Route path="/" element={<Dashboard />} />

        {/* CADASTROS */}
        <Route path="/agentes" element={<CadastroAgente />} />
        <Route path="/unidades" element={<CadastroUnidade />} />
        <Route path="/vacinas" element={<CadastroVacina />} />
        <Route path="/transferencias" element={<TransferenciaVacina />} />

        {/* LISTAGENS */}
        <Route path="/lista-agentes" element={<ListaAgentes />} />
        <Route path="/lista-unidades" element={<ListaUnidades />} />
        <Route path="/lista-vacinas" element={<ListaVacinas />} />
        <Route path="/lista-transferencias" element={<ListaTransferencias />} />
        <Route path="/lista-doses" element={<ListaDoses />} />
        <Route path="/lista-agendamentos" element={<ListaAgendamentos />} />
        <Route path="/lista-historico" element={<HistoricoImunizacao />} />

        {/* NOVAS FUNÇÕES */}
        <Route path="/registrar-doses" element={<RegistrarDoses />} />
        <Route path="/alertas-vencimento" element={<AlertasVencimento />} />
        <Route path="/agendar-vacina" element={<AgendarVacina />} />
        <Route path="/historico-imunizacao" element={<HistoricoImunizacao />} />
      </Routes>
    </BrowserRouter>
  );
}
