# PGATS - Desafio Final - Automação de Testes Web

## 📋 Índice
- [Proposta do Desafio](#proposta-do-desafio)
- [Solução Implementada](#solução-implementada)
- [Pipeline de Integração Contínua](#pipeline-de-integração-contínua-cicd)
- [Conceitos de GitHub Actions](#conceitos-de-github-actions)
- [Como Executar Localmente](#como-executar-localmente)
- [Como Usar a Pipeline](#como-usar-a-pipeline)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Conclusão](#conclusão)

## Proposta do Desafio

- Projeto Final da disciplina de **Automação de Testes Web** referente ao
- O objetivo é automatizar os casos de teste da aplicação fictícia **Automation Exercise** usando **Cypress**.
- A solução deve contemplar os casos descritos na página de testes: **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16**.
- O entregável deve seguir boas práticas de automação e organização, com modularização, uso adequado de seletores, relatórios e execução em GitHub Actions.

### Requisitos do Desafio

1. Implementar os testes do site Automation Exercise com o arquivo principal de testes dedicado ao trabalho final.
2. Utilizar estrutura modular para organização dos fluxos.
3. Evitar XPath, conforme orientado no enunciado.
4. Garantir execução estável em ambiente local e em CI.
5. Gerar relatório HTML/JSON com `cypress-mochawesome-reporter`.
6. Configurar execução em GitHub Actions.

## Solução Implementada

### Parte 1: Testes Automatizados

- O arquivo principal com todos os casos de teste está em:
  - `cypress/e2e/trabalho-final.cy.js`
- Os casos cobertos são:
  - Caso 1 - Register User
  - Caso 2 - Login User with correct email and password
  - Caso 3 - Login User with incorrect email and password
  - Caso 4 - Logout User
  - Caso 5 - Register User with existing email
  - Caso 8 - Verify All Products and product detail page
  - Caso 9 - Search Product
  - Caso 10 - Verify Subscription in home page
  - Caso 15 - Place Order: Register before Checkout
  - Caso 16 - Place Order: Login before Checkout

### Parte 2: Modularização

Os fluxos foram organizados em módulos para melhorar manutenção e reutilização do código:

- `cypress/modules/cadastro/index.js`
- `cypress/modules/login/index.js`
- `cypress/modules/produtos/index.js`
- `cypress/modules/pedido/index.js`
- `cypress/modules/subscription/index.js`

Essa organização permite separar responsabilidades e manter o projeto mais legível e escalável.

### Parte 3: Configuração do Projeto

- `cypress.config.js` centraliza:
  - URL base da aplicação
  - timeout global
  - reporter do Mochawesome
  - geração de videos e screenshots
- `package.json` contém os scripts principais para execução local e CI.
- `.github/workflows/pipeline.yml` define a execução da suíte no GitHub Actions.

### Parte 4: Relatórios

A solução usa `cypress-mochawesome-reporter`, gerando relatórios em HTML e JSON em:

- `cypress/reports/`
- `cypress/reports/json/`

Os relatórios são úteis tanto para validação local quanto para entrega na pipeline.

## Pipeline de Integração Contínua (CI/CD)

### Visão Geral

A solução inclui uma pipeline de integração contínua utilizando **GitHub Actions** para execução automática dos testes no ambiente de CI.

#### Arquivo de Configuração
- **Localização**: `.github/workflows/pipeline.yml`
- **Ferramenta**: GitHub Actions
- **Tecnologias**: Cypress + Node.js + npm + Mochawesome

```text
                              ┌─────────────────────┐
                              │   GitHub Actions    │
                              │   Projeto PGATS    │
                              └─────────────────────┘
                                       │
                          ┌────────────┼────────────┐
                          │            │            │
                  ┌───────▼──────┐ ┌────▼──────┐ ┌──────▼────────┐
                  │   PUSH      │ │  MANUAL  │ │   ARTIFACTS    │
                  │   (main)    │ │ dispatch │ │   REPORTS      │
                  └───────┬──────┘ └────┬─────┘ └──────┬────────┘
                          │            │                 │
                          └────────────┼─────────────────┘
                                       │
                                ┌──────▼────────┐
                                │  Run Cypress  │
                                │  and generate │
                                │  report       │
                                └────────────────┘
```

### Gatilhos da Pipeline

A pipeline principal foi configurada para facilitar execução em CI, com foco em:

1. **Push na branch principal**
2. **Execução manual pelo GitHub Actions**
3. **Upload de artefatos para relatórios e evidências**

> O projeto também pode ser expandido para execução agendada via CRON, caso seja necessário para monitoramento contínuo.

### Passos da Pipeline

1. Checkout do repositório
2. Setup do Node.js
3. Instalação das dependências via `npm ci`
4. Execução do arquivo de testes principal com Cypress
5. Upload dos relatórios gerados como artifacts

## Conceitos de GitHub Actions

### 1. Workflow
Um workflow é um arquivo YAML que define automações em resposta a eventos do repositório.

### 2. Triggers
Eventos que acionam a execução:
- `push`
- `pull_request`
- `workflow_dispatch`

### 3. Jobs
São os blocos de processamento da pipeline. Neste projeto, a execução é realizada em um job de testes em ambiente Linux.

### 4. Steps
Cada job é composto por passos, como:
- checkout do código
- instalação de dependências
- execução dos testes
- upload de artefatos

### 5. Artifacts
Arquivos gerados pela pipeline e disponibilizados para download, como:
- relatórios HTML
- relatórios JSON
- vídeos e screenshots

### 6. Runner
O ambiente executado pela GitHub Actions. Neste projeto, foi usado `ubuntu-latest`.

## Como Executar Localmente

### Pré-requisitos

- Node.js 18+ ou superior
- npm
- Git

### Instalação

```bash
git clone <url-do-repositorio>
cd pgats-automacao-web
npm install
```

### Execução dos testes

```bash
npm test
```

### Execução em modo headless

```bash
npx cypress run --spec "cypress/e2e/trabalho-final.cy.js" --browser electron --headless
```

### Visualização do relatório

Após a execução, o relatório é gerado em:

```bash
cypress/reports/index.html
```

Também é possível consultar os relatórios em JSON em:

```bash
cypress/reports/json/
```

## Como Usar a Pipeline

### 1. Execução automática
Quando houver push na branch principal, a GitHub Action inicia automaticamente.

### 2. Execução manual
1. Acesse o repositório no GitHub
2. Vá para a aba **Actions**
3. Selecione o workflow
4. Clique em **Run workflow**
5. Acompanhe a execução em tempo real

### 3. Verificação dos relatórios
1. Entre em **Actions**
2. Abra a execução desejada
3. Acesse a seção de **Artifacts**
4. Baixe o relatório gerado

## Estrutura do Projeto

```text
.
├── .github/
│   └── workflows/
│       └── pipeline.yml
├── cypress/
│   ├── e2e/
│   │   └── trabalho-final.cy.js
│   ├── modules/
│   │   ├── cadastro/
│   │   ├── login/
│   │   ├── pedido/
│   │   ├── produtos/
│   │   └── subscription/
│   ├── reports/            # gerados na execução
│   ├── screenshots/        # gerados na execução
│   ├── support/
│   └── videos/             # gerados na execução
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
├── README.md
└── node_modules/           # ignorado pelo Git (.gitignore)
```

## Tecnologias Utilizadas

### Automação Web
- **Cypress**
- **JavaScript**
- **Node.js**

### Relatórios
- **cypress-mochawesome-reporter**

### CI/CD
- **GitHub Actions**

### Versionamento/Gestão
- **Git**
- **GitHub**

## Conclusão

Este projeto implementa uma solução completa para o desafio final, com:

- ✅ automação dos casos de teste da aplicação Automation Exercise
- ✅ organização em módulos
- ✅ uso de seletores condizentes com boas práticas
- ✅ relatório em HTML/JSON
- ✅ execução em GitHub Actions
- ✅ documentação clara para uso local e em pipeline

A entrega está pronta para uso em ambiente de desenvolvimento e em pipeline de CI/CD, seguindo os requisitos da proposta do trabalho final.

---

Projeto desenvolvido para a Pós-Graduação em Automação de Testes (PGATS).
