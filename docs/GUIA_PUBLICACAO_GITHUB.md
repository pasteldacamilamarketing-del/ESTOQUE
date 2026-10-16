# Publicar no GitHub Pages

Esta versão foi preparada para GitHub Pages com React + Vite e usa rotas com `#`, evitando erro 404 ao atualizar páginas internas.

## Primeira publicação

1. Crie um repositório no GitHub, por exemplo `processos-pastel-da-camila`.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório.
3. Use a branch `main`.
4. No GitHub, abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **GitHub Actions**.
6. Faça um novo commit/push se necessário.
7. A ação `Publicar Processos Pastel da Camila` fará a validação da base, o build e a publicação.

## Atualizações

Edite a base em `src/data/siteData.js` ou os componentes React e envie para `main`. O GitHub republica automaticamente.

## Segurança e indexação

O HTML contém `noindex,nofollow` para evitar indexação por buscadores. Isso **não transforma um repositório público em privado**. Se houver informação que não pode ficar pública, use um ambiente/repositório com controle de acesso adequado.

## Regra do projeto

A interface não deve inventar processos. Informação pendente permanece identificada como pendente até homologação.
