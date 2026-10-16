import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock3 } from 'lucide-react';
import siteData from '../data/siteData';
import StatusBadge from '../components/StatusBadge';

export default function TodayPage({ view }) {
  const navigate=useNavigate();
  const day=new Date().getDay();
  const daily=siteData.routines.filter(r=>r.day===day);
  const visible=daily.length ? daily : siteData.routines.filter(r=>r.day===1 || r.day===2).slice(0,4);
  const viewInfo=siteData.views[view];
  const featured = view==='auditoria' ? 'auditoria-segunda' : view==='gestao' ? 'relatorio' : 'contagem';
  const featuredProcess=siteData.processes.find(p=>p.id===featured);
  const quick=['receber','entrada-nota','beneficiamento','feira'].map(id=>siteData.processes.find(p=>p.id===id)).filter(Boolean);

  return <>
    <section className="home-hero">
      <div>
        <span className="eyebrow">{siteData.meta.location}</span>
        <h1>O que precisa acontecer agora?</h1>
        <p>{viewInfo.desc}</p>
      </div>
      <div className="principle-card"><ShieldCheck size={24}/><span><small>Regra de controle</small><strong>{siteData.meta.control}</strong></span></div>
    </section>

    <section className="section-block">
      <div className="section-heading"><div><span className="eyebrow">Rotina</span><h2>{daily.length ? 'Hoje' : 'Próximas rotinas fixas'}</h2></div></div>
      <div className="timeline-grid">
        {visible.map((r,i)=><article className="routine-card" key={`${r.dayName}-${r.time}-${i}`} onClick={()=>navigate(`/fazer/${r.process}`)}>
          <div className="routine-time"><Clock3 size={18}/><strong>{r.time}</strong></div>
          <span>{r.dayName} • {r.role}</span><h3>{r.title}</h3><p>{r.desc}</p><StatusBadge status={r.status}/>
        </article>)}
      </div>
    </section>

    <section className="featured-process" onClick={()=>navigate(`/fazer/${featuredProcess.id}`)}>
      <div><span className="eyebrow">Comece por aqui</span><h2>{featuredProcess.title}</h2><p>{featuredProcess.summary}</p></div>
      <ArrowRight size={26}/>
    </section>

    <section className="section-block">
      <div className="section-heading"><div><span className="eyebrow">Operação</span><h2>Atalhos essenciais</h2><p>Quatro entradas frequentes. Para o restante, use “Fazer”.</p></div></div>
      <div className="quick-grid">
        {quick.map(p=><article className="quick-card" key={p.id} onClick={()=>navigate(`/fazer/${p.id}`)}><span className="process-icon">{p.icon}</span><div><strong>{p.title}</strong><small>{p.summary}</small></div><ArrowRight size={18}/></article>)}
      </div>
    </section>
  </>;
}
