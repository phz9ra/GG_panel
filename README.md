# GG Panel

## Visão geral

O GG Panel é uma aplicação web de gerenciamento de equipes e torneios de esportes eletrônicos. Ela permite que usuários autenticados visualizem e administrem times, jogadores, calendários de partidas e resultados, tudo em uma interface responsiva.

## Onde e como a aplicação é utilizada

- **Frontend**: desenvolvido com **React** e **Vite**, proporcionando recarga rápida durante o desenvolvimento e um bundle enxuto para produção.
- **Backend**: construído em **Node.js** com **Express**, oferecendo rotas RESTful simples para autenticação, CRUD de recursos e integração com o banco de dados.
- **Banco de dados**: utiliza **SQLite** para persistência de usuários, equipes, jogadores e torneios.
- **Deploy**: pode ser hospedado em serviços como Vercel, Netlify (frontend) e Render, Railway ou Heroku (backend).

Decisões de arquitetura e escolha de tecnologias

- **React** – permite criar componentes reutilizáveis e gerenciar o estado da aplicação de forma declarativa; escolhido por sua popularidade e grande ecossistema.
- **Vite** – substitui o tradicional Webpack, oferecendo tempos de start e build significativamente menores, ideal para um projeto em fase de prototipagem rápida.
- **React Router** – controla a navegação entre páginas públicas (login, cadastro) e rotas protegidas (dashboard, times, torneios) com um componente `PrivateRoute` que verifica a sessão do usuário.
- **Bootstrap + CSS** – fornece estilos consistentes e responsivos, enquanto as customizações de cores dão identidade visual ao projeto.
- **Context API** – gerencia a autenticação (token JWT) de forma simples, evitando a necessidade de bibliotecas externas como Redux.
- **Node/Express** – fornece uma camada de API leve e direta, facilitando a criação de rotas REST e a integração com o frontend via chamadas HTTP.


Como executar o projeto localmente

- clonar o repositório

git clone <url-do-repositorio>
cd gg-panel

- backend

cd backend
npm install
npm run dev  -> roda o servidor na porta 3001 (ou a configurada)

- frontend (em outra janela)

cd ../frontend
npm install
npm run dev  -> abre a aplicação em http://localhost:5173

## Observações

- Acabei tentando implementar algumas funcionalidades mas não consegui adicionar todas as propostas e as que eu gostaria de colocar nesse modelo de projeto, devido ao tempo e por não ter todo o conhecimento para aprender e aplicar rapidamente as features e etc. De qualquer modo boa parte do projeto esta funcional e creio que atende o modelo proposto para o projeto.
