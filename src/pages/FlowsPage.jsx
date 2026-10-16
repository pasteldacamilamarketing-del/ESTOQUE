import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import siteData from '../data/siteData';

function Flow({flow,onOpen}){return <article className={flow.id==='master'?'flow-card master':'flow-card'}><div><span className="eyebrow">Fluxo</span><h3>{flow.title}</h3><p>{flow.desc}</p></div><div className="flow-line">{flow.nodes.map(([label,id],i)=><React.Fragment key={`${label}-${i}`}>{i>0&&<span className="flow-arrow">→</span>}<button onClick={()=>onOpen(id)}>{label}</button></React.Fragment>)}</div></article>}

export default function FlowsPage(){const navigate=useNavigate();return <>
  <header className="page-header"><span className="eyebrow">Visão ponta a ponta</span><h1>Fluxos do estoque</h1><p>Veja cada processo do começo ao fim e entenda como uma etapa afeta a seguinte.</p></header>
  <div className="flows-stack">{siteData.flows.map(f=><Flow flow={f} key={f.id} onOpen={id=>navigate(`/fazer/${id}`)}/>)}</div>
  <section className="section-block"><div className="section-heading"><div><span className="eyebrow">Travas</span><h2>Regras que protegem o estoque</h2></div></div><div className="rules-grid">{siteData.rules.map(r=><article className={`rule-card ${r.level==='critica'?'critical':''}`} key={r.id}><ShieldCheck size={20}/><div><h3>{r.title}</h3><p>{r.text}</p></div></article>)}</div></section>
  </>}
