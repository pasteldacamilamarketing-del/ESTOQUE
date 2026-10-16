import data from '../src/data/siteData.js';
const fail = (m) => { console.error(`ERRO: ${m}`); process.exitCode = 1; };
const ids = new Set(data.processes.map(p=>p.id));
if (ids.size !== data.processes.length) fail('Há IDs de processo duplicados.');
for (const p of data.processes) {
  for (const field of ['id','title','summary','why','owner','reviewer','status']) if(!p[field]) fail(`${p.id}: campo obrigatório vazio: ${field}`);
  for (const r of p.related || []) if(!ids.has(r)) fail(`${p.id}: processo relacionado inexistente: ${r}`);
  for (const k of p.links || []) if(!data.saipos[k]) fail(`${p.id}: link Saipos inexistente: ${k}`);
}
for (const r of data.routines) if(!ids.has(r.process)) fail(`Rotina aponta para processo inexistente: ${r.process}`);
for (const f of data.flows) for (const [,id] of f.nodes) if(!ids.has(id)) fail(`Fluxo ${f.id} aponta para processo inexistente: ${id}`);
for (const p of data.problems) if(!ids.has(p.process)) fail(`Problema aponta para processo inexistente: ${p.process}`);
for (const [k,u] of Object.entries(data.saipos)) if(!/^https:\/\//.test(u)) fail(`URL Saipos inválida: ${k}`);
if (!process.exitCode) console.log(`OK: ${data.processes.length} processos, ${data.rules.length} regras, ${data.flows.length} fluxos, ${data.learn.length} módulos e ${data.problems.length} problemas validados.`);
