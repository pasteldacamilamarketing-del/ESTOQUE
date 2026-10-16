import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import siteData from '../data/siteData';

export default function LearnPage(){
  return <>
    <header className="page-header"><span className="eyebrow">Formação</span><h1>Aprender estoque</h1><p>Entenda o que está fazendo e por quê. O objetivo não é decorar o Saipos: é aprender a gerenciar o estoque.</p></header>
    <div className="lesson-grid">{siteData.learn.map((m,i)=><Link className="lesson-card" to={`/aprender/${m.id}`} key={m.id}><span className="lesson-index">{String(i+1).padStart(2,'0')}</span><span className="lesson-icon">{m.icon}</span><div><small>{m.level}</small><h3>{m.title}</h3><p>{m.summary}</p></div><ArrowRight size={18}/></Link>)}</div>
  </>;
}
