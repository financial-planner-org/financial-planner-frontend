# Financial Planner Frontend

Frontend do sistema de planejamento financeiro desenvolvido com Next.js 14, TypeScript e ShadCN/UI.

## 📋 Sumário

- [🚀 Tecnologias](#-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🛠️ Instalação e Execução](#️-instalação-e-execução)
- [🎨 Tema Dark Mode](#-tema-dark-mode)
- [🚀 Melhorias Implementadas](#-melhorias-implementadas)
- [✨ Funcionalidades](#-funcionalidades)
- [🔗 Integração Frontend-Backend](#-integração-frontend-backend)
- [📝 Validação de Formulários](#-validação-de-formulários)
- [🏗️ Padrões de Desenvolvimento](#️-padrões-de-desenvolvimento)
- [🧪 Testes](#-testes)
- [🔍 Análise de Qualidade de Código](#-análise-de-qualidade-de-código)
- [📦 Build e Deploy](#-build-e-deploy)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 🚀 Tecnologias

### Frontend – Next.js 14 (App Router) + TypeScript

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **App Router** - Roteamento baseado em arquivos

### UI: ShadCN/UI (dark‑mode default)

- **ShadCN/UI** - Componentes de interface com Tailwind CSS
- **Tailwind CSS** - Framework CSS utilitário
- **Dark Mode** - Tema escuro como padrão
- **Responsive Design** - Design adaptável para todos os dispositivos

### State/Data: TanStack Query (auto‑invalidar após mutações)

- **TanStack Query** - Gerenciamento de estado servidor
- **Auto-invalidação** - Cache automático após mutações
- **Hooks Customizados** - Abstração da lógica de API
- **Cache Inteligente** - Gerenciamento otimizado de dados

### Forms: React‑Hook‑Form + Zod v4

- **React Hook Form** - Gerenciamento de formulários
- **Zod v4** - Validação de schemas TypeScript
- **@hookform/resolvers** - Integração entre React Hook Form e Zod
- **Validação Tipada** - Schemas de validação com TypeScript

### Axios para chamadas REST

- **Axios** - Cliente HTTP para chamadas REST
- **Interceptors** - Interceptação de requisições e respostas
- **Configuração Centralizada** - Cliente configurado com base URL e timeouts
- **Error Handling** - Tratamento global de erros

### Ferramentas Adicionais

- **Recharts** - Gráficos e visualizações
- **next-themes** - Gerenciamento de temas (dark/light mode)
- **Lucide React** - Ícones SVG
- **SonarQube** - Análise de qualidade de código

## 📁 Estrutura do Projeto

### 🏗️ **Arquitetura Principal**

O projeto segue uma arquitetura modular e escalável, organizada em camadas bem definidas:

```text
financial-planner-frontend/
├── 📱 Frontend (Next.js 14 + TypeScript)
├── 🎨 UI Components (ShadCN/UI + Tailwind)
├── 🔄 State Management (TanStack Query)
├── 📝 Forms & Validation (React Hook Form + Zod)
├── 🌐 API Layer (Axios + Custom Hooks)
└── 🧪 Quality Assurance (SonarQube)
```

### 📂 **Estrutura de Diretórios**

#### **`src/app/` - Next.js App Router**

```text
app/
├── layout.tsx          # Layout principal com sidebar responsiva
├── page.tsx            # Página inicial (redireciona para alocações)
├── providers.tsx       # Providers do React (Query, Theme)
├── globals.css         # Estilos globais com tema dark
├── favicon.ico         # Ícone do site
├── middleware.ts       # Middleware para redirecionamentos
├── alocacoes/          # Página principal de alocações (dashboard)
│   └── page.tsx        # Dashboard de alocações
├── projecao/           # Página de projeção patrimonial
│   └── page.tsx        # Projeção com movimentações e seguros integrados
└── historico/          # Página de histórico de simulações
    └── page.tsx        # Histórico com versões legadas
```

#### **`src/components/` - Componentes Reutilizáveis**

```text
components/
├── ui/                 # Componentes ShadCN/UI
│   ├── badge.tsx       # Badge de status
│   ├── button.tsx      # Botões customizados
│   ├── card.tsx        # Cards de conteúdo
│   ├── dialog.tsx      # Modais e diálogos
│   ├── form.tsx        # Formulários base
│   ├── input.tsx       # Campos de entrada
│   ├── table.tsx       # Tabelas de dados
│   └── toast.tsx       # Notificações
├── admin-panel/        # Sidebar e painel administrativo
│   ├── sidebar.tsx     # Sidebar responsiva (mobile/desktop)
│   └── menu.tsx        # Componente de menu
├── layout/             # Componentes de layout
│   ├── app-layout.tsx  # Layout principal da aplicação
│   ├── page-container.tsx # Container padrão para páginas
│   └── section.tsx     # Componente de seção
├── allocations/        # Componentes de alocações
├── movements/          # Componentes de movimentações
├── insurances/         # Componentes de seguros
└── projections/        # Componentes de projeções
```

#### **`src/hooks/` - Hooks Customizados**

```text
hooks/
├── api/                # Hooks para API
│   └── use-simulations.ts # Hook para simulações
├── use-sidebar.ts      # Hook para sidebar
├── use-store.ts        # Hook para store global
└── index.ts            # Exportações centralizadas
```

#### **`src/lib/` - Configurações e Utilitários**

```text
lib/
├── api/                # Serviços de API
│   ├── client.ts       # Cliente Axios configurado
│   ├── simulations.ts  # API de simulações
│   ├── allocations.ts  # API de alocações
│   ├── movements.ts    # API de movimentações
│   └── insurance.ts    # API de seguros
├── constants/          # Constantes centralizadas e organizadas
│   ├── index.ts        # Exportações centralizadas
│   ├── pages-styles.ts # Estilos das páginas + estilos comuns
│   ├── routes.ts       # Rotas e navegação
│   ├── messages.ts     # Textos e mensagens
│   ├── utils.ts        # Funções utilitárias
│   ├── sidebar.ts      # Configurações do sidebar
│   ├── ui.ts           # Configurações de UI
│   ├── layout.ts       # Configurações de layout
│   └── api.ts          # Configurações da API
├── providers/          # Providers do React
│   └── query-provider.tsx # Provider do TanStack Query
├── types/              # Tipos TypeScript
│   └── core.ts         # Tipos principais
├── validations/        # Schemas Zod
│   ├── schemas.ts      # Schemas de validação
│   └── simulation.ts   # Schema de simulação
└── utils.ts            # Funções utilitárias
```

### 🎯 **Organização por Funcionalidade**

#### **1. Páginas Principais**

##### **🏠 Página Inicial**

- **`/` (Alocações)** - Página inicial com dashboard de alocações
  - Dashboard principal com visão geral das alocações
  - Cards informativos com métricas e indicadores
  - Interface responsiva e tema dark
  - Dados reais integrados com backend
  - Timeline de alocações manuais

##### **📊 Páginas de Gestão**

- **`/projecao`** - Projeção patrimonial
  - Gráficos dinâmicos e visualizações interativas
  - Cenários futuros baseados em dados reais
  - Status de vida (Vivo, Morto, Inválido)
  - Simulações dinâmicas em tempo real
  - Dados integrados de movimentações e seguros
  - Cálculos automáticos até 2060

- **`/historico`** - Histórico de simulações
  - Versões legadas com identificação automática
  - Comparação de simulações
  - Reabertura de versões antigas
  - Filtros por cliente
  - Indicadores visuais para versões legadas
  - Criação de novas versões

##### **🔧 Páginas de Configuração**

- **`/movimentacoes`** - Gestão de movimentações (integrada na projeção)
  - Formulários inteligentes com validação em tempo real
  - Histórico completo de operações
  - Categorização por tipo de movimentação
  - Frequências: Única, Mensal, Anual
  - Timeline encadeada de transações
  - CRUD completo de movimentações

- **`/seguros`** - Gestão de seguros (integrada na projeção)
  - Cadastro de apólices com informações completas
  - Controle de vencimentos e alertas automáticos
  - Cálculo de cobertura e análise de proteção
  - Tipos de seguro: Vida e Invalidez
  - CRUD completo de seguros
  - Dados reais integrados com backend

##### **🔄 Redirecionamentos**

- **`/dashboard`** - Redireciona automaticamente para `/` (Alocações)

#### **2. Componentes por Categoria**

- **UI Components** - Componentes base do ShadCN/UI
- **Layout Components** - Estrutura e containers
- **Business Components** - Componentes específicos do domínio
- **Admin Panel** - Sidebar e navegação

#### **3. Gerenciamento de Estado**

- **TanStack Query** - Cache e sincronização de dados
- **Custom Hooks** - Lógica de negócio reutilizável
- **API Layer** - Abstração das chamadas HTTP

#### **4. Configuração e Constantes**

- **Centralized Constants** - Valores reutilizáveis
- **Type Definitions** - Tipos TypeScript
- **Validation Schemas** - Validação com Zod

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

### Docker

```bash
# Build da imagem
docker build -t financial-planner-frontend .

# Executar container
docker run -p 3000:3000 financial-planner-frontend
```

## 🎨 Tema Dark Mode

O projeto está configurado com tema escuro como padrão, seguindo o design do Figma. O toggle de tema está disponível na sidebar.

### Configuração do Tema

- **Provider**: `next-themes` configurado em `app/providers.tsx`
- **Toggle**: Componente `ThemeToggle` na sidebar
- **CSS Variables**: Definidas em `globals.css` para light/dark mode
- **Tailwind**: Configurado com `darkMode: ["class"]`

## 🚀 Melhorias Implementadas

### Sidebar Responsiva

- **Design Responsivo**: Sidebar adaptável para mobile, tablet e desktop
- **Hamburger Menu**: Menu hambúrguer para dispositivos móveis
- **Zero Flash**: Carregamento suave sem flash de conteúdo
- **Constantes Centralizadas**: Todas as configurações em `lib/constants/sidebar.ts`
- **Componentes Reutilizáveis**: Código modular e reutilizável

#### Características da Sidebar

- **Desktop**: Sidebar fixa com logo e menu completo
- **Mobile**: Header com logo + hambúrguer, sidebar deslizante
- **Menu Hierárquico**: Suporte a submenus expansíveis
- **Ícones SVG**: Ícones personalizados com cores consistentes
- **Navegação Suave**: Transições e animações fluidas

### Arquitetura Melhorada

#### Constantes Centralizadas e Organizadas

O projeto implementa um sistema robusto de constantes centralizadas, eliminando completamente estilos hardcoded e redundâncias:

##### **📁 Estrutura de Constantes**

```text
src/lib/constants/
├── index.ts              # Exportações centralizadas
├── pages-styles.ts       # Estilos específicos das páginas + estilos comuns
├── routes.ts             # Rotas e navegação
├── messages.ts           # Textos e mensagens
├── utils.ts              # Funções utilitárias
├── sidebar.ts            # Configurações do sidebar
├── ui.ts                 # Configurações de UI
├── layout.ts             # Configurações de layout
└── api.ts                # Configurações de API
```

##### **🎯 Estilos das Páginas**

- **`ALLOCATIONS_STYLES`**: Estilos específicos da página de alocações
- **`PROJECTIONS_STYLES`**: Estilos específicos da página de projeção
- **`HISTORY_STYLES`**: Estilos específicos da página de histórico

##### **🔧 Estilos Comuns Reutilizáveis**

- **`COMMON_STYLES`**: Estilos compartilhados entre páginas
  - Flexbox: `flexCenter`, `flexCenterGap4`, `flexGap1`, `textCenter`
  - Posicionamento: `absoluteLeft0`, `absoluteLeft200`, `absoluteLeft400`, etc.
  - Botões: `buttonGhost`
  - Badges: `badgeLegacy`
  - Ícones: `iconSmall`, `iconMedium`, `iconLarge`
  - Controles: `filterContainer`, `selectTrigger`, `checkboxLabel`
  - Cards: `simulationCards`, `simulationData`, `simulationActions`
  - Sidebar: `sidebarDots`, `sidebarIcon`, `sidebarIconActive`
  - Decorativos: `decorativeBar`, `userInfo`, `userAvatar`

##### **✨ Benefícios Alcançados**

- ✅ **Zero Redundâncias**: Todos os estilos hardcoded eliminados
- ✅ **Reutilização Máxima**: Constantes compartilhadas entre páginas
- ✅ **Manutenibilidade**: Mudanças centralizadas em um local
- ✅ **Consistência**: Design system unificado
- ✅ **Performance**: Menos código duplicado
- ✅ **Escalabilidade**: Fácil adição de novos estilos

#### API e Estado

- **TanStack Query**: Gerenciamento de estado servidor
- **Hooks Customizados**: `use-simulations`, `use-allocations`, etc.
- **Cliente Axios**: Configuração centralizada com interceptors
- **Validação Zod**: Schemas de validação tipados

#### Componentes Reutilizáveis

- **`PageContainer`**: Container padrão para páginas
- **`Section`**: Seções com título e conteúdo
- **`SidebarIcon`**: Componente para ícones do sidebar
- **`MenuItemComponent`**: Item de menu reutilizável

### Performance e UX

- **Hidratação Otimizada**: Renderização condicional baseada no cliente
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Smooth Scrolling**: Scroll suave em toda a aplicação
- **Custom Scrollbar**: Scrollbar personalizada para o sidebar
- **Responsive Design**: Adaptação automática para todos os dispositivos

### Organização de Código e Manutenibilidade

#### **🎯 Sistema de Constantes Avançado**

O projeto implementa um sistema sofisticado de organização de constantes que elimina completamente redundâncias e estilos hardcoded:

##### **📊 Métricas de Melhoria**

| **Antes** | **Depois** |
|-----------|------------|
| 54+ estilos hardcoded | 0 estilos hardcoded |
| Código duplicado | Constantes reutilizáveis |
| Manutenção difícil | Manutenção centralizada |
| Inconsistência visual | Design system unificado |

##### **🔧 Funções Utilitárias Centralizadas**

- **`getIconColor()`**: Retorna cores de ícones baseadas no tipo
- **`formatMovementData()`**: Formata dados de movimentações
- **`formatInsuranceData()`**: Formata dados de seguros
- **`getStatusLabel()`**: Converte status para labels legíveis

##### **📱 Páginas 100% Limpas**

- ✅ **`/alocacoes`** - Usa `ALLOCATIONS_STYLES` + `COMMON_STYLES`
- ✅ **`/projecao`** - Usa `PROJECTIONS_STYLES` + `COMMON_STYLES`
- ✅ **`/historico`** - Usa `HISTORY_STYLES` + `COMMON_STYLES`

##### **🚀 Benefícios Técnicos**

- **Manutenibilidade**: Mudanças centralizadas em um local
- **Reutilização**: Constantes compartilhadas entre páginas
- **Consistência**: Design system unificado
- **Performance**: Menos código duplicado
- **Escalabilidade**: Fácil adição de novos estilos
- **Legibilidade**: Código mais limpo e organizado

## ✨ Funcionalidades

### 🏠 **Página Inicial (Alocações)**

- **Dashboard Principal** - Visão geral das alocações atuais
- **Cards Informativos** - Métricas e indicadores importantes
- **Interface Responsiva** - Adaptável para todos os dispositivos
- **Tema Dark** - Visual moderno e profissional
- **Dados Reais** - Integração completa com backend
- **Timeline de Alocações** - Histórico visual de investimentos
- **Redirecionamento Automático** - `/` e `/dashboard` direcionam para alocações

### 📊 **Gestão de Alocações**

- **Visualização de Ativos** - Lista completa de investimentos
- **Métricas de Performance** - Rendimento e evolução
- **Filtros Avançados** - Busca e organização de dados
- **Cards Interativos** - Informações detalhadas de cada alocação
- **CRUD Completo** - Criar, editar e excluir alocações
- **Registros Históricos** - Timeline de valores por ativo

### 📈 **Projeção Patrimonial**

- **Gráficos Dinâmicos** - Visualizações interativas
- **Cenários Futuros** - Projeções baseadas em dados reais
- **Tabelas de Dados** - Informações estruturadas
- **Status de Vida** - Vivo, Morto, Inválido
- **Simulações Dinâmicas** - Seleção de simulações em tempo real
- **Dados Integrados** - Movimentações e seguros reais
- **Cálculos Automáticos** - Projeções até 2060
- **Seção de Movimentações** - Gestão integrada de receitas e despesas
- **Seção de Seguros** - Gestão integrada de apólices

### 💰 **Gestão de Movimentações** *(Integrada na Projeção)*

- **Formulários Inteligentes** - Validação em tempo real
- **Histórico Completo** - Todas as operações registradas
- **Categorização** - Organização por tipo de movimentação
- **Frequências** - Única, Mensal, Anual
- **Timeline Encadeada** - Sequências de transações
- **CRUD Completo** - Operações completas de movimentações
- **Integração Visual** - Seção dedicada na página de projeção

### 🛡️ **Gestão de Seguros** *(Integrada na Projeção)*

- **Cadastro de Apólices** - Informações completas
- **Controle de Vencimentos** - Alertas automáticos
- **Cálculo de Cobertura** - Análise de proteção
- **Tipos de Seguro** - Vida e Invalidez
- **CRUD Completo** - Gestão completa de seguros
- **Dados Reais** - Integração com backend
- **Integração Visual** - Seção dedicada na página de projeção

### 📚 **Histórico de Simulações**

- **Versões Legadas** - Identificação automática de versões antigas
- **Comparação de Simulações** - Visualização de diferentes cenários
- **Reabertura de Versões** - Acesso a simulações antigas
- **Indicadores Visuais** - Badges para versões legadas
- **Filtros por Cliente** - Histórico específico por cliente
- **Criação de Novas Versões** - Duplicação de simulações
- **Navegação para Projeção** - Acesso direto aos gráficos

### 📱 **Interface Responsiva**

- **Sidebar Inteligente** - Navegação adaptável
- **Menu Mobile** - Hambúrguer para dispositivos pequenos
- **Design Moderno** - Interface limpa e profissional
- **Navegação Intuitiva** - Fácil acesso a todas as funcionalidades
- **Design Fiel ao Figma** - Implementação exata do design

### 🔧 **Recursos Técnicos**

- **Validação de Formulários** - React Hook Form + Zod
- **Gerenciamento de Estado** - TanStack Query
- **Cache Inteligente** - Otimização de performance
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Integração Completa** - Frontend totalmente integrado com backend

## 🔗 Integração Frontend-Backend

### ✅ **Status da Integração**

O frontend está **100% integrado** com o backend, utilizando dados reais em todas as funcionalidades:

#### **Hooks de API Implementados**

- ✅ `use-simulations.ts` - CRUD completo de simulações
- ✅ `use-clients.ts` - CRUD completo de clientes  
- ✅ `use-allocations.ts` - CRUD completo de alocações
- ✅ `use-movements.ts` - CRUD completo de movimentações
- ✅ `use-insurances.ts` - CRUD completo de seguros
- ✅ `use-projections.ts` - Cálculo de projeções patrimoniais
- ✅ `use-simulation-history.ts` - Histórico de simulações com versões

#### **Páginas Integradas**

- ✅ **Alocações** (`/alocacoes`) - Dashboard principal com CRUD completo
- ✅ **Projeção** (`/projecao`) - Dados reais de simulações + movimentações + seguros integrados
- ✅ **Histórico** (`/historico`) - Versões legadas e comparação de simulações
- ✅ **Redirecionamentos** - `/` e `/dashboard` direcionam para alocações

#### **Funcionalidades Implementadas**

##### **Projeção Patrimonial**

- ✅ Seleção dinâmica de simulações
- ✅ Status de vida (Vivo/Morto/Inválido)
- ✅ Exibição de movimentações reais
- ✅ Exibição de seguros reais
- ✅ Estados de loading e error
- ✅ Filtragem de simulações mais recentes

##### **Histórico de Simulações**

- ✅ Identificação automática de versões legadas
- ✅ Comparação de simulações
- ✅ Reabertura de versões antigas
- ✅ Criação de novas versões
- ✅ Filtros por cliente
- ✅ Indicadores visuais para versões legadas

#### **Dados de Teste Disponíveis**

- ✅ **2 clientes** ativos com dados completos (Matheus Silveira, Pedro Magalhães)
- ✅ **6 simulações** (Plano Original, Situação Atual, Realizado, Aposentadoria, etc.)
- ✅ **4 alocações** por simulação (CDB Banco Itaú, CDB Banco C6, Apartamento, Loja)
- ✅ **11 movimentações** diversificadas (salários, custos de vida, herança, comissão)
- ✅ **2 seguros** por simulação (vida e invalidez)
- ✅ **Registros históricos** para cada alocação (timeline de valores)

### 🔧 **Configuração da API**

A URL da API é configurada através da variável de ambiente:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Para Docker, a URL é automaticamente configurada para `http://backend:3001`.

#### **Endpoints Testados e Utilizados**

##### **🔍 Saúde e Monitoramento**

- `GET /api/health` - Status da aplicação e uptime

  ```json
  {
    "status": "ok",
    "timestamp": "2025-09-30T19:03:00.458Z",
    "uptime": 6198.9013816,
    "version": "0.1.0"
  }
  ```

##### **👥 Clientes**

- `GET /api/clients` - Listar todos os clientes
- `GET /api/clients/:id` - Obter cliente por ID
- `POST /api/clients` - Criar novo cliente
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Deletar cliente

##### **📊 Simulações**

- `GET /api/simulations` - Listar todas as simulações
- `GET /api/simulations/history` - Histórico com versões legadas
- `GET /api/simulations/:id` - Obter simulação por ID
- `POST /api/simulations` - Criar nova simulação
- `PUT /api/simulations/:id` - Atualizar simulação
- `DELETE /api/simulations/:id` - Deletar simulação
- `GET /api/simulations/:id/status` - Status e permissões da simulação
- `POST /api/simulations/:id/current-situation` - Criar Situação Atual
- `POST /api/simulations/:id/duplicate` - Duplicar simulação
- `POST /api/simulations/:id/create-version` - Criar nova versão

##### **💰 Alocações**

- `GET /api/simulations/:simulationId/allocations` - Listar alocações da simulação
- `GET /api/allocations/:id` - Obter alocação por ID
- `POST /api/allocations` - Criar nova alocação
- `PUT /api/allocations/:id` - Atualizar alocação
- `DELETE /api/allocations/:id` - Deletar alocação
- `GET /api/allocations/:id/records` - Histórico de registros da alocação
- `POST /api/allocations/:id/records` - Adicionar registro à alocação

##### **💸 Movimentações**

- `GET /api/simulations/:simulationId/movements` - Listar movimentações da simulação
- `GET /api/movements/:id` - Obter movimentação por ID
- `POST /api/movements` - Criar nova movimentação
- `PUT /api/movements/:id` - Atualizar movimentação
- `DELETE /api/movements/:id` - Deletar movimentação

##### **🛡️ Seguros**

- `GET /api/simulations/:simulationId/insurances` - Listar seguros da simulação
- `GET /api/insurances/:id` - Obter seguro por ID
- `POST /api/insurances` - Criar novo seguro
- `PUT /api/insurances/:id` - Atualizar seguro
- `DELETE /api/insurances/:id` - Deletar seguro

##### **📈 Projeções**

- `POST /api/projections` - Calcular projeção patrimonial até 2060

  ```json
  {
    "simulationId": 1,
    "lifeStatus": "VIVO",
    "realRate": 0.04
  }
  ```

##### **📚 Dados de Exemplo Disponíveis**

- ✅ **2 clientes** ativos com dados completos
- ✅ **6 simulações** (Plano Original, Situação Atual, Realizado, etc.)
- ✅ **4 alocações** por simulação (CDB, apartamento, loja)
- ✅ **11 movimentações** diversificadas (salários, custos, herança)
- ✅ **2 seguros** (vida e invalidez) por simulação
- ✅ **Registros históricos** para cada alocação

#### **Exemplos de Resposta dos Endpoints**

##### **Clientes**

```json
[
  {
    "id": 1,
    "name": "Matheus Silveira",
    "email": "matheus.silveira@email.com",
    "phone": "(11) 99999-8888",
    "address": "Vila Olímpia, São Paulo/SP",
    "isActive": true,
    "createdAt": "2025-09-30T17:17:42.264Z",
    "updatedAt": "2025-09-30T17:17:42.264Z"
  }
]
```

##### **Simulações**

```json
[
  {
    "id": 1,
    "name": "Plano Original",
    "description": "Plano original de investimentos",
    "status": "ATIVO",
    "baseId": null,
    "startDate": "2025-01-01T00:00:00.000Z",
    "realRate": 0.04,
    "createdAt": "2025-09-30T17:17:42.276Z",
    "updatedAt": "2025-09-30T17:17:42.276Z"
  }
]
```

##### **Alocações com Registros Históricos**

```json
[
  {
    "id": 1,
    "simulationId": 1,
    "type": "FINANCIAL",
    "name": "CDB Banco Itaú",
    "value": 1000000,
    "startDate": "2024-06-20T00:00:00.000Z",
    "records": [
      {
        "id": 3,
        "allocationId": 1,
        "date": "2025-06-10T00:00:00.000Z",
        "value": 1100000,
        "notes": "Última atualização"
      }
    ]
  }
]
```

##### **Movimentações**

```json
[
  {
    "id": 1,
    "simulationId": 1,
    "type": "INCOME",
    "value": 220000,
    "description": "Herança",
    "frequency": "UNIQUE",
    "startDate": "2023-07-09T00:00:00.000Z",
    "endDate": "2023-07-22T00:00:00.000Z",
    "category": "HERANCA"
  }
]
```

##### **Seguros**

```json
[
  {
    "id": 1,
    "simulationId": 1,
    "name": "Seguro de Vida Familiar",
    "type": "LIFE",
    "startDate": "2025-01-01T00:00:00.000Z",
    "durationMonths": 180,
    "premium": 120,
    "insuredValue": 500000
  }
]
```

##### **Status de Simulação**

```json
{
  "simulationId": 1,
  "isCurrentSituation": false,
  "canEdit": true,
  "canDelete": true,
  "isLegacy": false,
  "restrictions": {
    "cannotEdit": false,
    "cannotDelete": false,
    "isLegacyVersion": false,
    "isCurrentSituation": false
  }
}
```

#### **🧪 Como Testar os Endpoints**

##### **Teste Rápido com cURL**

```bash
# Verificar saúde da aplicação
curl http://localhost:3001/api/health

# Listar clientes
curl http://localhost:3001/api/clients

# Listar simulações
curl http://localhost:3001/api/simulations

# Histórico de simulações
curl http://localhost:3001/api/simulations/history

# Alocações de uma simulação
curl http://localhost:3001/api/simulations/1/allocations

# Movimentações de uma simulação
curl http://localhost:3001/api/simulations/1/movements

# Seguros de uma simulação
curl http://localhost:3001/api/simulations/1/insurances

# Status de uma simulação
curl http://localhost:3001/api/simulations/1/status
```

##### **Documentação Interativa**

- **Swagger UI**: <http://localhost:3001/documentation>
- **JSON Schema**: <http://localhost:3001/documentation/json>

##### **Teste de Projeção (POST)**

```bash
curl -X POST http://localhost:3001/api/projections \
  -H "Content-Type: application/json" \
  -d '{
    "simulationId": 1,
    "lifeStatus": "VIVO",
    "realRate": 0.04
  }'
```

## 📝 Validação de Formulários

Todos os formulários utilizam:

- **React Hook Form** para gerenciamento de estado
- **Zod** para validação de schemas
- **@hookform/resolvers** para integração

Exemplo de uso:

```typescript
const form = useForm<CreateSimulation>({
  resolver: zodResolver(createSimulationSchema),
  defaultValues: { ... }
});
```

## 🏗️ Padrões de Desenvolvimento

### Estrutura de Componentes

- **Componentes Funcionais**: Uso exclusivo de React Hooks
- **TypeScript**: Tipagem estática em todos os componentes
- **Props Interface**: Interfaces definidas para todas as props
- **Constantes Centralizadas**: Configurações em arquivos separados

### Gerenciamento de Estado

- **TanStack Query**: Para estado servidor e cache
- **useState/useEffect**: Para estado local dos componentes
- **Context API**: Para estado global quando necessário

### Estilização

- **Tailwind CSS**: Classes utilitárias para estilização
- **ShadCN/UI**: Componentes base com Tailwind
- **Constantes CSS**: Classes centralizadas em arquivos de constantes
- **Responsive Design**: Mobile-first com breakpoints específicos

### API e Dados

- **Axios**: Cliente HTTP com interceptors
- **Hooks Customizados**: Abstração da lógica de API
- **Zod Schemas**: Validação de dados de entrada e saída
- **TypeScript Types**: Tipagem para todas as entidades

### Performance

- **Lazy Loading**: Carregamento sob demanda
- **Memoização**: React.memo para componentes pesados
- **Hidratação Otimizada**: Renderização condicional no cliente
- **Bundle Splitting**: Divisão automática do código

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage
```

## 🔍 Análise de Qualidade de Código

### SonarQube (SonarCloud)

O projeto está configurado para análise de qualidade de código usando SonarCloud:

- **URL**: [SonarCloud](https://sonarcloud.io/)
- **Versão**: Gratuita
- **Organization**: Criada no GitHub para hospedar os repositórios
- **Integração**: Análise automática de qualidade de código

#### Configuração do SonarCloud

1. **Criar Organization no GitHub**:
   - Acesse [GitHub Organizations](https://github.com/settings/organizations)
   - Crie uma nova organization
   - Adicione os repositórios do projeto

2. **Configurar SonarCloud**:
   - Acesse [SonarCloud](https://sonarcloud.io/)
   - Conecte com sua conta GitHub
   - Selecione a organization criada
   - Configure os repositórios para análise

3. **Arquivo de Configuração**:

   ```yaml
   # sonar-project.properties
   sonar.projectKey=financial-planner-frontend
   sonar.organization=your-organization
   sonar.sources=src
   sonar.exclusions=**/node_modules/**,**/dist/**,**/.next/**
   sonar.javascript.lcov.reportPaths=coverage/lcov.info
   ```

#### Métricas Analisadas

- **Code Smells**: Problemas de manutenibilidade
- **Bugs**: Erros potenciais no código
- **Vulnerabilities**: Problemas de segurança
- **Coverage**: Cobertura de testes
- **Duplications**: Código duplicado
- **Technical Debt**: Dívida técnica estimada

#### Integração CI/CD

```yaml
# .github/workflows/sonarcloud.yml
name: SonarCloud
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## 📦 Build e Deploy

### Build Standalone (Docker)

O projeto está configurado com `output: 'standalone'` no `next.config.js` para otimizar builds Docker.

### Variáveis de Ambiente

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
