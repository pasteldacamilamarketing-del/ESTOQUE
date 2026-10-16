# Arquitetura da interface V1.2

## Produto

A ferramenta foi organizada para cinco perguntas reais do usuário:

- **Hoje:** o que precisa acontecer agora?
- **Fazer:** como executo uma tarefa?
- **Aprender:** o que estou fazendo e por quê?
- **Fluxos:** como o processo acontece do começo ao fim?
- **Ajuda:** o que faço quando algo dá errado?

## Responsividade

- desktop amplo: conteúdo até 1240 px, navegação superior e painéis laterais;
- notebook/tablet: grids de duas colunas e reorganização automática;
- mobile: uma coluna, navegação inferior fixa e busca em tela cheia;
- alvos de toque com aproximadamente 44–46 px;
- suporte a `prefers-reduced-motion` e foco de teclado.

## Engenharia

- React 18;
- Vite;
- React Router com HashRouter para compatibilidade com GitHub Pages;
- Lucide para ícones consistentes;
- base única em `src/data/siteData.js`;
- verificação automática de referências antes do build;
- GitHub Actions para publicar em Pages.

## UX

O usuário vê uma ação principal por contexto. Cards inteiros são clicáveis para reduzir excesso de botões. Processos longos mantêm as travas e critérios de conclusão visíveis em desktop e os reorganizam abaixo da execução em mobile.
