# 💰 Financy

Financy é uma aplicação completa de gerenciamento financeiro pessoal composta por um **Backend em Node.js com GraphQL** e um **Frontend em React com Vite e TailwindCSS**.

---

## 🚀 Pré-requisitos

Antes de começar, garante que você tem instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- `npm` (gerenciador de pacotes incluído com o Node.js)

---

## 📦 Passo a Passo para Rodar Localmente

### 1. Clonar o Repositório e Instalar Dependências

Abra o terminal na raiz do projeto e execute:

```bash
npm install
```

> Este comando instalará as dependências de todo o projeto (raiz, `backend` e `frontend`).

---

### 2. Configurar Variáveis de Ambiente

#### Backend (`/backend`)
Navegue até a pasta do backend (ou crie o arquivo `.env` na pasta `backend`) com base no `.env.example`:

```bash
cp backend/.env.example backend/.env
```

Conteúdo esperado no `backend/.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecret"
JWT_EXPIRES_IN="3600"
```

#### Frontend (`/frontend`)
Crie o arquivo `.env` na pasta `frontend` com base no `.env.example`:

```bash
cp frontend/.env.example frontend/.env
```

Conteúdo esperado no `frontend/.env`:
```env
VITE_API_URL=http://localhost:4000/graphql
```

---

### 3. Configurar o Banco de Dados (SQLite + Prisma)

**Não é necessário criar o arquivo do banco de dados manualmente.** O Prisma cria o arquivo `dev.db` automaticamente ao sincronizar o schema com o banco:

```bash
npm run db:push
```

*(Ou se preferir executar dentro da pasta `backend`, rode `npx prisma db push`).*

---

### 4. Gerar Tipos do GraphQL (`codegen`)

Como a pasta `src/graphql/generated` está no `.gitignore`, é **necessário** rodar o codegen para gerar os tipos e hooks do GraphQL no frontend:

```bash
npm run codegen
```
*(Ou se estiver na pasta `frontend`, rode `npm run codegen`).*

---

### 5. Executar a Aplicação

Para iniciar o **Backend** e o **Frontend** simultaneamente, execute o comando abaixo na raiz do projeto:

```bash
npm run dev
```

> 💡 **Nota:** Este comando inicia ambos os serviços em paralelo usando `npm-run-all`. Caso queira executar apenas um dos serviços individualmente, você pode usar `npm run dev:backend` ou `npm run dev:frontend`.

---

## 🌐 URLs de Acesso

- **Frontend (Interface do Usuário):** [http://localhost:5173](http://localhost:5173)
- **Backend (Servidor GraphQL / Apollo Playground):** [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, TypeScript, Express, Apollo Server (GraphQL), TypeGraphQL, Prisma ORM, SQLite, JWT (Autenticação).
- **Frontend:** React, TypeScript, Vite, TailwindCSS, Base UI, TanStack Query (React Query), Lucide React.
