import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Search, ExternalLink, CalendarDays, PlayCircle, GraduationCap, Workflow, CircleHelp } from 'lucide-react';
import siteData from '../data/siteData';
import SearchDialog from './SearchDialog';

const nav = [
  ['/', 'Hoje', CalendarDays],
  ['/fazer', 'Fazer', PlayCircle],
  ['/aprender', 'Aprender', GraduationCap],
  ['/fluxos', 'Fluxos', Workflow],
  ['/ajuda', 'Ajuda', CircleHelp]
];

export default function AppShell({ view, setView }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const go = path => navigate(path);

  return <>
    <a className="skip-link" href="#content">Pular para o conteúdo</a>
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={()=>go('/')} aria-label="Ir para Hoje">
          <img src="./assets/brand/logo-pastel-da-camila.png" alt="Pastel da Camila" />
          <span><strong>PROCESSOS</strong><small>Estoque Central • KM 18</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map(([to,label])=><NavLink key={to} to={to} end={to==='/' ? true : undefined}>{label}</NavLink>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button" onClick={()=>setSearchOpen(true)} aria-label="Pesquisar"><Search/></button>
          <label className="view-control"><span>Visão</span><select value={view} onChange={e=>setView(e.target.value)}>
            <option value="operacao">Operação</option><option value="auditoria">Auditoria</option><option value="gestao">Gestão</option>
          </select></label>
          <a className="saipos-button" href="https://conta.saipos.com/" target="_blank" rel="noreferrer">
            <img src="./assets/brand/logo-saipos.png" alt=""/><span>Saipos</span><ExternalLink size={15}/>
          </a>
        </div>
      </header>
      <main id="content" className="page-shell"><Outlet /></main>
      <footer className="site-footer"><span>Processos Pastel da Camila • V1.2</span><span>Físico → Registro → Conferência → Evidência</span></footer>
    </div>
    <nav className="mobile-nav" aria-label="Navegação mobile">
      {nav.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/' ? true : undefined}><Icon size={21}/><span>{label}</span></NavLink>)}
    </nav>
    <SearchDialog open={searchOpen} onClose={()=>setSearchOpen(false)} data={siteData} onNavigate={go}/>
  </>;
}
