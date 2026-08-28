<div align="center">

# GG Panel

Painel web para gerenciamento de equipes, jogadores e torneios de e-sports.

![React](https://img.shields.io/badge/React-0D1117?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-0D1117?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-0D1117?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-0D1117?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-0D1117?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## `> sobre_o_projeto`

O **GG Panel** é uma aplicação full stack criada para centralizar o gerenciamento de estruturas competitivas de e-sports. O sistema reúne informações de times, jogadores e torneios em uma interface web organizada e responsiva.

## `> funcionalidades`

- Autenticação de usuários
- Gerenciamento de equipes
- Cadastro e gerenciamento de jogadores
- Cadastro de torneios
- Dashboard com informações gerais
- Rotas protegidas no frontend
- Comunicação entre frontend e API REST
- Persistência local com SQLite

## `> stack`

### Frontend

- React
- Vite
- React Router
- Axios
- Bootstrap
- Recharts
- JWT Decode

### Backend

- Node.js
- Express
- better-sqlite3
- bcryptjs
- JSON Web Token
- CORS

## `> arquitetura`

```text
GG_panel/
├── backend/
│   ├── API REST
│   └── SQLite
├── frontend/
│   ├── React
│   └── Vite
└── README.md
```

O frontend consome a API Express por HTTP, enquanto o backend concentra autenticação, regras da aplicação e persistência.

## `> executando_localmente`

### Backend

```bash
cd backend
npm install
node index.js
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O Vite disponibiliza o frontend normalmente em:

```text
http://localhost:5173
```

## `> status`

Projeto acadêmico funcional em evolução. Algumas funcionalidades planejadas ainda podem ser ampliadas ou refinadas, mas a versão atual já demonstra a integração entre frontend, backend, autenticação e banco de dados.

## `> aprendizados`

O projeto foi utilizado para consolidar conceitos de:

- desenvolvimento full stack;
- APIs REST;
- autenticação JWT;
- React e componentização;
- persistência com SQLite;
- organização de rotas e recursos de uma aplicação web.

---

<div align="center">

Desenvolvido por **Pedro Henrique** · [@phz9ra](https://github.com/phz9ra)

</div>
