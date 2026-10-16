import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CircleAlert, ExternalLink, ShieldAlert, UserRound, SearchCheck } from 'lucide-react';
import siteData from '../data/siteData';
import StatusBadge from '../components/StatusBadge';

const labelLink = k => ({notas:'Notas de entrada',conciliacao:'Conciliação de estoque',financeiro:'Conciliação financeira',conversao:'Conversão de unidades',movimentos:'Movimentações',transferencia:'Transferência entre lojas',contagem:'Posição e contagem',contagem_whatsapp:'Contagem pelo WhatsApp',perdas:'Perdas',compras:'Lista de compras',ingredientes:'Ingredientes e insumos',fichas:'Fichas técnicas',beneficiados:'Ingredientes beneficiados',preproducao:'Preparos e pré-produções',historico:'Histórico do estoque',custo_medio:'Custo médio',cmv_real:'CMV real'})[k] || k.replaceAll('_',' ');

export default function ProcessDetailPage(){
  const {id}=useParams(); const navigate=useNavigate();
  const p=siteData.processes.find(x=>x.id===id);
  if(!p) return <div className="empty-state">Processo não encontrado.</div>;
  const rules=siteData.rules.filter(r=>r.applies?.includes(p.id));
  const related=p.related.map(x=>siteData.processes.find(y=>y.id===x)).filter(Boolean);
  return <>
    <button className="back-link" onClick={()=>navigate(-1)}><ArrowLeft size={17}/> Voltar</button>
    <header className="process-detail-head">
      <div><span className="eyebrow">{p.area}</span><h1>{p.icon} {p.title}</h1><p>{p.summary}</p></div>
      <StatusBadge status={p.status}/>
    </header>

    <div className="process-meta">
      <div><UserRound size={18}/><span><small>Quem executa</small><strong>{p.owner}</strong></span></div>
      <div><SearchCheck size={18}/><span><small>Quem confere</small><strong>{p.reviewer}</strong></span></div>
    </div>

    <section className="why-panel"><strong>Por que fazemos assim?</strong><p>{p.why}</p></section>

    <div className="detail-layout">
      <div>
        <section className="content-section"><h2>Antes de começar</h2><ul className="check-list">{p.before.map(x=><li key={x}><CheckCircle2 size={18}/>{x}</li>)}</ul></section>
        <section className="content-section"><h2>Passo a passo</h2><div className="steps-list">{p.steps.map(([title,text],i)=><article className="step-card" key={`${title}-${i}`}><span className="step-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
        {!!p.decisions.length && <section className="content-section"><h2>Decisões</h2>{p.decisions.map((d,i)=><article className="decision-card" key={i}><h3>{d.q}</h3><div><span><strong>SIM</strong>{d.yes}</span><span><strong>NÃO</strong>{d.no}</span></div></article>)}</section>}
        {p.screen && <section className="content-section"><h2>Tela real</h2><figure className="screen-figure"><img src={`./${p.screen}`} alt={`Tela real relacionada a ${p.title}`}/><figcaption>Evidência visual usada no processo.</figcaption></figure></section>}
        {!!p.links.length && <section className="content-section"><h2>Ajuda oficial Saipos</h2><div className="official-links">{p.links.map(k=>siteData.saipos[k] && <a key={k} href={siteData.saipos[k]} target="_blank" rel="noreferrer">{labelLink(k)}<ExternalLink size={15}/></a>)}</div></section>}
      </div>
      <aside className="detail-aside">
        <section className="side-panel danger"><h3><ShieldAlert size={19}/> Não faça</h3><ul>{p.locks.map(x=><li key={x}>{x}</li>)}</ul></section>
        <section className="side-panel success"><h3><CheckCircle2 size={19}/> Terminou certo quando</h3><ul>{p.done.map(x=><li key={x}>{x}</li>)}</ul></section>
        <section className="side-panel"><h3><CircleAlert size={19}/> Evidência</h3><ul>{p.evidence.map(x=><li key={x}>{x}</li>)}</ul></section>
        {!!rules.length && <section className="side-panel"><h3>Regras relacionadas</h3>{rules.map(r=><p key={r.id}><strong>{r.title}.</strong> {r.text}</p>)}</section>}
      </aside>
    </div>
    {!!related.length && <section className="section-block"><div className="section-heading"><div><span className="eyebrow">Continue</span><h2>Processos relacionados</h2></div></div><div className="related-row">{related.map(x=><Link key={x.id} to={`/fazer/${x.id}`}>{x.title}</Link>)}</div></section>}
  </>;
}
