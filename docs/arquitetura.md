# Arquitetura

## Visão geral

```
 Navegador
     │
     ▼
 Frontend (React + Vite)
     │  /api/...
     ▼
 API (FastAPI) ───────────────▶ PostgreSQL
     │                              ▲
     │ enfileira scan (planejado)   │ salva resultados
     ▼                              │
 Redis (fila) ──▶ Worker ───────────┘
                    │
                    ├──▶ GitHub API  (lê os arquivos de dependências)
                    └──▶ OSV.dev API (consulta vulnerabilidades)
```

## Componentes

| Componente | Pasta | Status | Responsabilidade |
|---|---|---|---|
| Frontend | `frontend/` | Esqueleto | Interface do usuário. Em desenvolvimento, o Vite repassa `/api` para a API, então não é preciso configurar CORS (*Cross-Origin Resource Sharing*). |
| API | `backend/` | Esqueleto | Autenticação, regras de negócio e acesso ao banco. Hoje só tem `/api/health` e `/api/health/db`. |
| PostgreSQL | `compose.yaml` | Configurado | Usuários, organizações, repositórios, scans e achados. |
| Redis + worker | — | Planejado (semana 4) | Rodar scans em segundo plano. Um scan pode levar vários segundos, e fazê-lo dentro da requisição HTTP travaria a resposta. |

## Fluxo de um scan (planejado)

1. O usuário pede um scan de um repositório no dashboard.
2. A API registra o scan com status `pending` e o coloca na fila.
3. O worker busca na GitHub API os arquivos de dependências (`package-lock.json`, `requirements.txt`).
4. O worker extrai a lista de pacotes e versões e consulta o OSV.dev em lote.
5. O worker salva os achados e marca o scan como `done` (ou `failed`).
6. O dashboard mostra o resultado e atualiza o histórico.

## Modelo de dados (planejado)

```
users          (id, github_id, username, created_at)
organizations  (id, name)
memberships    (user_id, org_id, role)      -- owner | admin | viewer
repositories   (id, org_id, github_repo_id, full_name)
scans          (id, repo_id, status, started_at, finished_at)
findings       (id, scan_id, package, version, vuln_id, severity, fixed_version)
audit_logs     (id, user_id, org_id, action, created_at)
```

## Decisões

As decisões de arquitetura ficam registradas em `docs/adr/`:

- [0001: Stack inicial](adr/0001-stack-inicial.md)
