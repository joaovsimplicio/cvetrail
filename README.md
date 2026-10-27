# CVEtrail

> Em construção.

Plataforma web que monitora vulnerabilidades conhecidas (CVEs) nas dependências dos seus repositórios do GitHub e mostra o que está em risco, quão grave é e como corrigir.

## Como rodar

Pré-requisitos: Docker, Python 3.10+ e Node 22+.

```bash
cp .env.example .env              # e troque a senha do banco
docker compose up -d --build      # banco + API em http://localhost:8000

cd frontend
npm install
npm run dev                       # interface em http://localhost:5173
```

## Testes

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
pytest
```

## Documentação

- [Visão do produto e roadmap](docs/visao.md)
- [Arquitetura](docs/arquitetura.md)
- [Segurança e threat model](docs/seguranca.md)
- [Decisões de arquitetura](docs/adr/)
