# Segurança

Este documento é o threat model (modelo de ameaças) do projeto. Ele cresce junto com o código: cada nova rota, integração ou dado sensível deve aparecer aqui.

## Ativos (o que precisa ser protegido)

- Tokens de acesso ao GitHub dos usuários
- A lista de vulnerabilidades de cada repositório, que revela por onde um sistema pode ser atacado
- Dados de contas e organizações

## Atores

- Usuário legítimo
- Membro de outra organização tentando ver dados que não são dele
- Atacante externo, sem conta
- GitHub, que envia webhooks
- OSV.dev, a fonte dos dados de vulnerabilidades

## Fronteiras de confiança

Pontos onde dados passam de um lado menos confiável para outro mais confiável:

- Navegador → API
- GitHub → API (webhooks)
- API/worker → GitHub API e OSV.dev (respostas externas também são entrada não confiável)
- API/worker → banco

## Ameaças (STRIDE)

STRIDE é um método para listar ameaças por categoria: *Spoofing* (falsificação de identidade), *Tampering* (adulteração), *Repudiation* (negar ter feito algo), *Information disclosure* (vazamento de informação), *Denial of service* (negação de serviço) e *Elevation of privilege* (elevação de privilégio).

| Categoria | Ameaça | Mitigação | Status |
|---|---|---|---|
| Spoofing | Webhook falso, fingindo ser o GitHub | Validar a assinatura HMAC (`X-Hub-Signature-256`) com comparação em tempo constante | Planejado |
| Spoofing | CSRF (*Cross-Site Request Forgery*) no fluxo de login | Validar o parâmetro `state` do OAuth; cookies `HttpOnly`, `Secure` e `SameSite` | Planejado |
| Tampering | Arquivo de dependências malicioso (gigante ou malformado) derrubando o parser | Limite de tamanho, parser tolerante a erros e timeout | Planejado |
| Repudiation | Usuário nega ter removido um repositório ou mudado permissões | Log de auditoria das ações sensíveis | Planejado |
| Information disclosure | IDOR entre organizações (acessar dados de outra organização trocando o ID na URL) | Toda consulta filtra pela organização do usuário, com testes automatizados | Planejado |
| Information disclosure | Vazamento dos tokens do GitHub | Criptografia em repouso (AES-GCM); tokens nunca enviados ao frontend | Planejado |
| Information disclosure | Detalhes internos expostos em mensagens de erro | Respostas de erro genéricas | Aplicado em `/api/health/db` |
| Denial of service | Abuso da API ou disparo de scans em massa | Rate limiting por usuário e fila com limite | Planejado |
| Elevation of privilege | Usuário com papel de leitor executando ação de admin | Permissões verificadas no backend, não só na interface | Planejado |
| Elevation of privilege | Permissões excessivas no GitHub | GitHub App com acesso só de leitura e apenas aos repositórios escolhidos (princípio do menor privilégio) | Planejado |

## Medidas já aplicadas

- Segredos fora do git (`.env` está no `.gitignore`)
- Portas do banco e da API publicadas só em `127.0.0.1`
- O container da API roda com um usuário sem privilégios
- Ruff com as regras de segurança do bandit
- CI com permissão mínima (`contents: read`)

## A fazer (hardening, isto é, endurecimento)

- Headers de segurança (CSP, *Content Security Policy*; HSTS, *HTTP Strict Transport Security*)
- Fixar as actions do GitHub pelo hash do commit, em vez da tag
- Dependabot e scan das próprias dependências (usar o CVEtrail no próprio repositório)
