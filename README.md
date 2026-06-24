# World Cup Live

Aplicação frontend para acompanhamento de partidas da Copa do Mundo, desenvolvida com React, TypeScript e WebSocket.

O sistema consulta periodicamente os dados da TheSportsDB por meio de um servidor Node.js e envia as atualizações para o cliente React utilizando WebSocket.

## Funcionalidades

* Acompanhamento das partidas do dia.
* Atualização automática dos dados a cada 30 segundos.
* Comunicação em tempo real entre servidor e frontend com WebSocket.
* Dashboard com resumo das partidas.
* Busca de partidas por seleção.
* Filtro por status da partida.
* Paginação da listagem.
* Página de detalhes de cada partida.
* Autenticação simulada.
* Rotas protegidas.
* Sessão persistida no `localStorage`.
* Tema claro e escuro.
* Preferência de tema persistida no `localStorage`.
* Layout responsivo.
* Testes automatizados com Vitest e React Testing Library.

## Tecnologias

### Frontend

* React 19
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Sass

### Servidor

* Node.js
* WebSocket com a biblioteca `ws`
* `tsx` para execução do servidor TypeScript

### Testes e qualidade

* Vitest
* React Testing Library
* Testing Library User Event
* Jest DOM
* ESLint
* Prettier

## API utilizada

O projeto utiliza a API pública da TheSportsDB:

```text
https://www.thesportsdb.com/api/v1/json/123
```

O endpoint utilizado pelo servidor para buscar as partidas do dia é:

```text
/eventsday.php
```

A Copa do Mundo é consultada utilizando o identificador de liga:

```text
4429
```

## Arquitetura

A TheSportsDB fornece os dados através de uma API REST.

O servidor Node.js consulta a API periodicamente e distribui as informações para o frontend por meio de uma conexão WebSocket.

```text
TheSportsDB REST API
        ↓
Servidor Node.js
Polling a cada 30 segundos
        ↓
Servidor WebSocket
        ↓
Aplicação React
```

O frontend não consulta diretamente os dados das partidas. As atualizações são recebidas através do WebSocket.

## WebSocket

O servidor WebSocket é executado em:

```text
ws://localhost:8080
```

Quando um cliente se conecta, o servidor envia os últimos dados disponíveis.

A cada 30 segundos, o servidor:

1. Consulta a TheSportsDB.
2. Atualiza a lista de partidas.
3. Envia os dados para todos os clientes conectados.

Também é enviado um heartbeat para manter e demonstrar a conexão ativa.

## Autenticação

A autenticação é simulada, conforme permitido nos requisitos do trabalho.

O usuário informa um nome no formulário de login. Após o envio:

* o nome é salvo no `localStorage`;
* o estado global de autenticação é atualizado;
* as rotas protegidas são liberadas.

Não existe validação de senha ou integração com um servidor de autenticação.

A sessão pode ser encerrada pelo botão `Sair`.

## Gerenciamento de estado

A aplicação utiliza Context API em conjunto com `useReducer` para controlar a autenticação.

Essa abordagem foi escolhida por ser uma solução nativa do React e suficiente para o escopo do projeto, sem necessidade de adicionar uma biblioteca externa de gerenciamento de estado.

As alterações são realizadas por ações previsíveis:

```text
LOGIN
LOGOUT
```

A configuração do tema também utiliza Context API e é persistida no `localStorage`.

## Rotas

### `/login`

Página de autenticação simulada.

### `/`

Dashboard protegido com:

* status da conexão WebSocket;
* horário da última atualização;
* total de partidas;
* partidas em andamento;
* partidas finalizadas;
* cards das partidas do dia.

### `/matches`

Listagem das partidas com:

* busca por seleção;
* filtro por status;
* paginação;
* acesso à página de detalhes.

### `/matches/:id`

Página dinâmica de detalhes da partida.

As informações dessa página são atualizadas quando novos dados são recebidos pelo WebSocket.

### `/settings`

Página de configurações com seleção de tema claro ou escuro.

A preferência é salva no `localStorage`.

## Status das partidas

Alguns dos status retornados pela API são tratados e apresentados pela aplicação:

| Status       | Significado    |
| ------------ | -------------- |
| `NS`         | Não iniciada   |
| `1H`         | Primeiro tempo |
| `HT`         | Intervalo      |
| `2H`         | Segundo tempo  |
| `FT`         | Finalizada     |
| `ET`         | Prorrogação    |
| `P` ou `PEN` | Pênaltis       |

## Como executar

### Pré-requisitos

* Node.js
* pnpm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/LeonardoAlmeidaPereira/projeto-frameworks.git
```

Entre na pasta do projeto:

```bash
cd projeto-frameworks
```

Instale as dependências:

```bash
pnpm install
```

### Ambiente de desenvolvimento

Execute:

```bash
pnpm dev
```

Esse comando inicia simultaneamente:

* o frontend Vite;
* o servidor Node.js com WebSocket.

A aplicação ficará disponível em:

```text
http://localhost:5173
```

O servidor WebSocket será iniciado em:

```text
ws://localhost:8080
```

### Executar apenas o frontend

```bash
pnpm dev:client
```

### Executar apenas o servidor

```bash
pnpm dev:server
```

## Scripts

```bash
pnpm dev
```

Inicia frontend e servidor simultaneamente.

```bash
pnpm dev:client
```

Inicia somente o Vite.

```bash
pnpm dev:server
```

Inicia somente o servidor WebSocket.

```bash
pnpm build
```

Valida o TypeScript e gera a versão de produção.

```bash
pnpm lint
```

Executa o ESLint.

```bash
pnpm test
```

Executa os testes em modo de observação.

```bash
pnpm test:run
```

Executa todos os testes uma vez e encerra.

```bash
pnpm preview
```

Executa uma prévia do build de produção.

## Testes automatizados

O projeto possui testes unitários e testes de componentes.

Os testes verificam:

* classificação de partidas ao vivo;
* classificação de partidas finalizadas;
* classificação de partidas agendadas;
* tratamento de status desconhecido;
* helpers de status;
* renderização dos dados no card;
* link para os detalhes da partida;
* tratamento de dados ausentes;
* renderização do formulário de login;
* validação do nome obrigatório;
* autenticação e persistência no `localStorage`.

Para executar:

```bash
pnpm test:run
```

## Validação do projeto

Os seguintes comandos devem terminar sem erros:

```bash
pnpm lint
pnpm test:run
pnpm build
```