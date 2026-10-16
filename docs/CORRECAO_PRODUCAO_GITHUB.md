# Correção de produção — GitHub Pages

## Erro corrigido
A versão anterior foi publicada como código-fonte do Vite/React. O `index.html` apontava para `/src/main.jsx`, que não é o arquivo que deve ser entregue ao navegador em produção.

## Correção aplicada
- `vite.config.js` usa `base: '/ESTOQUE/'`;
- GitHub Actions instala as dependências, valida e gera `dist/`;
- GitHub Pages publica somente `dist/`;
- `404.html` redireciona acessos fora do hash para a aplicação;
- logos, favicons, manifest e imagens públicas são copiados pelo build.

## Configuração necessária no repositório
Em **Settings → Pages → Build and deployment → Source**, selecionar **GitHub Actions**.

Depois disso, qualquer push na branch `main` publica automaticamente a versão de produção.
