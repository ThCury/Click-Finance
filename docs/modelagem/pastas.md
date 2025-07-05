# Estrutura do Backend

Este documento descreve a arquitetura e a organização de pastas do backend do projeto **Investment Manager**, seguindo o padrão de **3 camadas**: apresentação, aplicação e infraestrutura.

---

## 📁 Estrutura de Diretórios

investment_manager/<br>
├── app/<br>
│ ├── api/ # Rotas da API (camada de apresentação)<br>
│ │ └── v1/<br>
│ │ └── endpoints.py<br>
│ ├── services/ # Lógica de negócio (camada de aplicação)<br>
│ │ └── investment_service.py<br>
│ ├── repositories/ # Acesso a dados e integrações externas (infraestrutura)<br>
│ │ ├── alphavantage.py # Integração com a API AlphaVantage<br>
│ │ └── db_repository.py # Acesso ao banco de dados<br>
│ ├── models/ # Entidades e DTOs<br>
│ ├── core/ # Configurações, utilitários e exceções<br>
│ └── main.py # Ponto de entrada da aplicação<br>
├── requirements.txt # Dependências do projeto<br>
└── README.md # Descrição geral do projeto<br>

---

## 🧱 Arquitetura em 3 Camadas

O backend segue o modelo clássico de arquitetura em **3 camadas**, com responsabilidades bem definidas:

### 1. 🎯 Camada de Apresentação (`api/`)

Responsável por **expor os endpoints da API** REST. Aqui ficam as rotas que recebem requisições do frontend ou de outras aplicações e direcionam para os serviços apropriados.

**Responsabilidades:**

- Definir rotas (ex: `/investments`, `/summary`)
- Receber e validar entradas (query params, headers, body)
- Retornar respostas HTTP

---

### 2. 🧠 Camada de Aplicação (`services/`)

Contém a **lógica de negócio** da aplicação. Essa camada processa os dados recebidos da API e coordena chamadas aos repositórios e modelos.

**Responsabilidades:**

- Orquestrar o fluxo da lógica
- Realizar cálculos, transformações e validações
- Aplicar regras de negócio (ex: cálculo de rentabilidade, filtros de ações)

---

### 3. 🛠️ Camada de Infraestrutura (`repositories/`)

Encapsula o acesso a **fontes externas de dados**, como:

- **AlphaVantage API**, via chamadas HTTP
- **Banco de dados** (ex: PostgreSQL, SQLite), via ORM ou SQL direto

**Responsabilidades:**

- Buscar ou salvar dados
- Conectar com serviços externos
- Isolar dependências externas da lógica da aplicação

---

## 📦 Outras Pastas Importantes

- `models/`: define as **entidades** do sistema (ex: Ação, Carteira, Empresa), além de **DTOs** para entrada/saída de dados.
- `core/`: configurações globais, utilitários, tratadores de exceção, variáveis de ambiente, middlewares, etc.
- `main.py`: ponto de entrada da aplicação (ex: inicialização do FastAPI/Flask, carregamento de rotas).

---

## ✅ Vantagens dessa Arquitetura

- Separação clara de responsabilidades
- Facilita testes, manutenção e escalabilidade
- Reutilização de lógica de negócio em múltiplos contextos (API, CLI, workers)
- Redução de acoplamento entre componentes
- Fácil integração com outras fontes de dados ou serviços

---

> Essa estrutura serve como base sólida para o crescimento do sistema, permitindo a inclusão de novos módulos, serviços ou integrações com baixo impacto no restante da aplicação.
