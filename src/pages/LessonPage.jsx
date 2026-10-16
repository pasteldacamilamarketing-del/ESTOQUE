import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import siteData from '../data/siteData';

export default function LessonPage(){
  const {id}=useParams(); const navigate=useNavigate(); const m=siteData.learn.find(x=>x.id===id); const [answer,setAnswer]=useState(null);
  if(!m) return <div className="empty-state">Módulo não encontrado.</div>;
  const correct=answer===m.quiz.correct;
  return <>
    <button className="back-link" onClick={()=>navigate(-1)}><ArrowLeft size={17}/> Voltar</button>
    <header className="lesson-head"><span>{m.icon}</span><div><small>{m.level}</small><h1>{m.title}</h1><p>{m.summary}</p></div></header>
    <section className="learning-content">{m.content.map((x,i)=><p key={i}>{x}</p>)}</section>
    <section className="mastery-panel"><CheckCircle2 size={22}/><div><strong>Você domina quando</strong><p>{m.mastery}</p></div></section>
    <section className="quiz-card"><span className="eyebrow">Teste rápido</span><h2>{m.quiz.q}</h2><div className="quiz-options">{m.quiz.options.map((x,i)=><button key={i} className={answer===i?'selected':''} onClick={()=>setAnswer(i)}>{x}</button>)}</div>{answer!==null && <div className={`quiz-feedback ${correct?'good':'bad'}`}><strong>{correct?'Correto.':'Revise.'}</strong> {m.quiz.why}</div>}</section>
  </>;
}
