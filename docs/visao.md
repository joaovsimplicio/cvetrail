# Visão do produto

> Documento vivo. O projeto ainda está sendo idealizado; o que está aqui é o ponto de partida, não um compromisso.

## Problema

Projetos modernos dependem de dezenas ou centenas de bibliotecas de terceiros. Quando uma delas tem uma vulnerabilidade conhecida (CVE, *Common Vulnerabilities and Exposures*, o catálogo público de falhas de segurança), o projeto herda o problema, muitas vezes sem que ninguém perceba.

## O produto em uma frase

A pessoa entra com a conta do GitHub e escolhe os repositórios. A plataforma mostra quais dependências têm vulnerabilidades conhecidas, quão graves elas são, como corrigir e como isso muda ao longo do tempo.

## Funcionalidades

### MVP (produto mínimo viável)

- Login com GitHub
- Conectar repositórios
- Rodar um scan: ler `package-lock.json` ou `requirements.txt` e consultar a API do [OSV.dev](https://osv.dev) (base pública de vulnerabilidades em software de código aberto)
- Dashboard com as vulnerabilidades por severidade e por repositório, mostrando a versão que corrige cada uma

### Depois do MVP

- Scans em segundo plano (fila de jobs) e histórico com gráfico de evolução
- Organizações com papéis (dono, admin, leitor)
- Novo scan a cada push, via webhooks do GitHub
- Alertas por e-mail ou Discord quando aparecer uma CVE crítica
- Log de auditoria (quem fez o quê e quando)

### Ideias para mais adiante

- CLI e GitHub Action que reaproveitam o mesmo motor de scan
- Saída em SARIF (*Static Analysis Results Interchange Format*, formato padrão de resultados de análise que o GitHub Code Scanning lê)
- Detecção de *typosquatting* (pacotes maliciosos com nome quase igual ao de um popular, como `reqeusts`)
- Geração de SBOM (*Software Bill of Materials*, a lista de componentes do software) no formato CycloneDX

## Fora do escopo (por enquanto)

- Analisar o código-fonte do repositório (SAST, *Static Application Security Testing*). O foco são as dependências.
- Corrigir dependências automaticamente (abrir PRs de atualização).

## Roadmap

Considerando cerca de 10 h por semana. Ajustar quando as horas disponíveis estiverem definidas.

| Semana | Entrega | Status |
|---|---|---|
| 1 | Repositório, Docker Compose (API + Postgres), CI com lint e testes, login com GitHub | Estrutura criada em 2026-10-27; falta o login |
| 2 | Listar os repositórios do usuário e rodar um scan simples (só npm), salvando os resultados | — |
| 3 | Dashboard: tabela de vulnerabilidades, filtro por severidade, página por repositório | — |
| 4 | Fila de jobs, scans em segundo plano, histórico com gráfico; suporte a Python | — |
| 5 | Organizações, papéis, log de auditoria e testes de autorização | — |
| 6 | Webhooks (novo scan a cada push) e alertas no Discord | — |
| 7 | Revisão de segurança, threat model completo, deploy, README com GIF e artigo | — |

## Questões em aberto

- [x] Nome definitivo: CVEtrail (decidido em 2026-10-27)
- [ ] Horas por semana disponíveis (definem o ritmo do roadmap)
- [ ] README em inglês? Ajuda em vagas internacionais
- [ ] Onde fazer o deploy (Render, Railway, Fly.io...)
- [ ] Quais permissões exatas pedir no GitHub App
- [ ] Quais ecossistemas suportar além de npm e PyPI (Go? Maven?)
