import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import siteData from '../data/siteData';
import ProcessCard from '../components/ProcessCard';

export default function ProcessesPage(){
  const navigate=useNavigate();
  const areas=['Todos',...new Set(siteData.processes.map(p=>p.area))];
  const [area,setArea]=useState('Todos');
  const items=useMemo(()=>area==='Todos'?siteData.processes:siteData.processes.filter(p=>p.area===area),[area]);
  return <>
    <header className="page-header"><span className="eyebrow">Execução</span><h1>Fazer</h1><p>Escolha o que está acontecendo agora. Cada processo explica o que fazer, por que fazer, as travas e como provar que terminou certo.</p></header>
    <div className="filter-row" aria-label="Filtrar por área">{areas.map(a=><button key={a} className={area===a?'active':''} onClick={()=>setArea(a)}>{a}</button>)}</div>
    <div className="process-grid">{items.map(p=><ProcessCard key={p.id} process={p} onOpen={id=>navigate(`/fazer/${id}`)}/>)}</div>
  </>;
}
