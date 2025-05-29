# Skybr API

API RESTful para gerenciamento de usuários e personagens.

## Visão Geral

Este projeto é uma API desenvolvida em Node.js com TypeScript, utilizando Express, Prisma e outras bibliotecas para segurança e boas práticas. O foco é o gerenciamento de usuários e seus personagens.

## Requisitos de Ambiente

- **Node.js**: v22.14.0
- **pnpm**: v10.11.0

Certifique-se de utilizar essas versões para garantir compatibilidade com o projeto.

## Como rodar

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Configure as variáveis de ambiente (`.env`), incluindo `PORT` e `CLIENT_URL`.
3. Rode as migrações do Prisma, se necessário.
4. Inicie o servidor:
   ```bash
   pnpm dev
   ```
   O servidor estará disponível em [http://localhost:3001](http://localhost:3001).

## Endpoints Principais

### Usuários

- `GET /api/users`  
  Lista todos os usuários.

- `POST /api/users`  
  Cria um novo usuário.

- `POST /api/users/onboard`  
  Cria um usuário e um personagem associado.

- `DELETE /api/users/:userId`  
  Remove um usuário.

### Personagens

- `GET /api/users/:userId/characters`  
  Lista personagens de um usuário.

- `POST /api/users/:userId/characters`  
  Cria um personagem para o usuário.

## Estrutura do Projeto

- `src/domains/users` – lógica e rotas de usuários
- `src/domains/characters` – lógica e rotas de personagens
- `src/errors` – tratamento de erros HTTP
- `src/middleware` – middlewares globais
- `src/utils` – funções utilitárias
- `prisma/schema.prisma` – modelo do banco de dados

## Dependências Principais

- express
- cors
- helmet
- nocache
- prisma
- dotenv

## Observações

- Todas as respostas são em JSON.
- O projeto segue boas práticas de segurança com Helmet e CORS.
- Certifique-se de configurar corretamente as variáveis de ambiente.
