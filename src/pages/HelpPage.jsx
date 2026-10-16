import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TriangleAlert, ExternalLink } from 'lucide-react';
import siteData from '../data/siteData';

export default function HelpPage(){const navigate=useNavigate();return <>
  <header className="page-header"><span className="eyebrow">Problemas reais</span><h1>Ajuda</h1><p>Comece pelo que aconteceu. A ferramenta leva ao processo certo sem transformar exceção em regra inventada.</p></header>
  <div className="problem-grid">{siteData.problems.map((x,i)=><article className="problem-card" key={i} onClick={()=>navigate(`/fazer/${x.process}`)}><div><h3>{x.title}</h3><p>{x.answer}</p></div><ArrowRight size={18}/></article>)}</div>
  <section className="section-block"><div className="section-heading"><div><span className="eyebrow">Parar e escalar</span><h2>Pendências ainda não homologadas</h2><p>Esses pontos não viram instrução até existir uma decisão segura.</p></div></div><div className="pending-grid">{siteData.pending.map((x,i)=><article className="pending-card" key={i}><TriangleAlert size={20}/><div><h3>{x.title}</h3><p>{x.impact}</p><small>Responsável: {x.owner}</small></div></article>)}</div></section>
  <section className="official-help"><div><span className="eyebrow">Software</span><h2>Central oficial Saipos</h2><p>Use para confirmar o comportamento do sistema. As regras da Pastel da Camila continuam nesta ferramenta.</p></div><a href={siteData.saipos.colecao} target="_blank" rel="noreferrer">Abrir ajuda Saipos <ExternalLink size={16}/></a></section>
  </>}
