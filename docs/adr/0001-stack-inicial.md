# ADR 0001: Stack inicial

- **Status:** aceita. Pode ser revista enquanto o projeto é idealizado.
- **Data:** 2026-10-27

## Contexto

O projeto precisa de um backend com API, banco relacional e uma interface web. O autor já trabalhou com FastAPI e Docker Compose, e quer terminar o MVP em poucas semanas sem deixar de aprender coisas novas.

## Decisão

- **Backend:** Python com FastAPI. Python é muito usado em segurança, então o aprendizado continua útil depois do projeto.
- **ORM e driver:** SQLAlchemy 2 com psycopg 3. ORM (*Object-Relational Mapping*) é a camada que traduz objetos Python em tabelas do banco.
- **Banco:** PostgreSQL.
- **Frontend:** React + TypeScript com Vite, como SPA (*Single-Page Application*, uma página que se atualiza sem recarregar).
- **Ambiente:** Docker Compose para o banco e a API; GitHub Actions para a CI.

## Alternativas consideradas

- **Next.js no frontend:** foi a sugestão inicial. Ficou para depois porque traz um segundo servidor (Node) além da API. Como toda a lógica fica no FastAPI, uma SPA com Vite é mais simples de rodar e de publicar.
- **Go no backend:** é ótimo para ferramentas de segurança, mas aprender uma linguagem nova junto com o domínio atrasaria o MVP. Go pode entrar mais tarde, na CLI.
- **Fila desde o início:** Redis e o worker só entram quando os scans ficarem assíncronos (semana 4). Até lá, o scan roda dentro da requisição.

## Consequências

- Há dois ambientes de desenvolvimento (Python e Node), cada um com o seu gerenciador de pacotes.
- Em desenvolvimento, o proxy do Vite evita a configuração de CORS. Em produção, isso depende da forma de deploy, que ainda está em aberto.
