import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

const normalize = (s='') => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

export default function SearchDialog({ open, onClose, data, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    const close = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return data.processes.slice(0,6).map(p => ({type:'Processo', title:p.title, sub:p.summary, path:`/fazer/${p.id}`}));
    const score = text => {
      const t = normalize(text); let s = t.includes(q) ? 30 : 0;
      q.split(/\s+/).forEach(w => { if (w && t.includes(w)) s += 4; });
      return s;
    };
    const items=[];
    data.processes.forEach(p => {
      const s=score([p.title,p.summary,...p.search,...p.locks,p.steps.flat().join(' ')].join(' '));
      if(s) items.push({s,type:'Processo',title:p.title,sub:p.summary,path:`/fazer/${p.id}`});
    });
    data.problems.forEach(x => {
      const s=score(`${x.title} ${x.keywords} ${x.answer}`);
      if(s) items.push({s,type:'Problema',title:x.title,sub:x.answer,path:`/fazer/${x.process}`});
    });
    data.learn.forEach(m => {
      const s=score(`${m.title} ${m.summary} ${m.content.join(' ')}`);
      if(s) items.push({s,type:'Aprender',title:m.title,sub:m.summary,path:`/aprender/${m.id}`});
    });
    return items.sort((a,b)=>b.s-a.s).slice(0,12);
  }, [query, data]);

  if (!open) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(e)=>e.target===e.currentTarget && onClose()}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Pesquisar na ferramenta">
        <div className="dialog-head">
          <div><strong>Pesquisar</strong><small>Processos, regras, problemas e treinamento</small></div>
          <button className="icon-button" onClick={onClose} aria-label="Fechar pesquisa"><X /></button>
        </div>
        <div className="search-input-wrap"><Search size={20}/><input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} aria-label="Pesquisar processos e problemas" placeholder="Ex.: feira voltou, segunda, caixa 24 latas..." /></div>
        <div className="search-results">
          {results.map((r,i)=><button key={`${r.path}-${i}`} onClick={()=>{onNavigate(r.path);onClose();}} className="search-result">
            <span><small>{r.type}</small><strong>{r.title}</strong><em>{r.sub}</em></span><ArrowRight size={18}/>
          </button>)}
          {!results.length && <div className="empty-state">Nada encontrado. Tente outra palavra.</div>}
        </div>
      </section>
    </div>
  );
}
