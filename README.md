# Financial Planner Frontend

Frontend do sistema de planejamento financeiro desenvolvido com Next.js 14, TypeScript e ShadCN/UI.

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
├── page.tsx            # Página inicial (Alocações)
├── providers.tsx       # Providers do React (Query, Theme)
├── globals.css         # Estilos globais com tema dark
├── favicon.ico         # Ícone do site
├── dashboard/          # Dashboard (redireciona para alocações)
├── projecao/           # Página de projeção patrimonial
├── alocacoes/          # Página de alocações
├── movimentacoes/      # Página de movimentações
├── historico/          # Página de histórico
└── seguros/            # Página de seguros
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
├── constants/          # Constantes centralizadas
│   ├── ui.ts           # Constantes de UI
│   ├── sidebar.ts      # Constantes do sidebar
│   ├── pages.ts        # Constantes das páginas
│   ├── layout.ts       # Constantes de layout
│   ├── api.ts          # Constantes da API
│   ├── components.ts   # Constantes de componentes
│   └── messages.ts     # Mensagens e textos
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

- **`/` (Alocações)** - Página inicial com dashboard de alocações
- **`/dashboard`** - Redireciona para alocações
- **`/projecao`** - Projeção patrimonial
- **`/movimentacoes`** - Gestão de movimentações
- **`/seguros`** - Gestão de seguros
- **`/historico`** - Histórico de operações

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

#### Constantes Centralizadas

- **`ui.ts`**: Cores, tamanhos e estilos de UI
- **`sidebar.ts`**: Configurações específicas do sidebar
- **`pages.ts`**: Constantes das páginas e seções
- **`api.ts`**: Configurações da API e cache
- **`components.ts`**: Configurações de componentes
- **`messages.ts`**: Textos e mensagens centralizadas

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

## ✨ Funcionalidades

### 🏠 **Página Inicial (Alocações)**

- **Dashboard Principal** - Visão geral das alocações atuais
- **Cards Informativos** - Métricas e indicadores importantes
- **Interface Responsiva** - Adaptável para todos os dispositivos
- **Tema Dark** - Visual moderno e profissional

### 📊 **Gestão de Alocações**

- **Visualização de Ativos** - Lista completa de investimentos
- **Métricas de Performance** - Rendimento e evolução
- **Filtros Avançados** - Busca e organização de dados
- **Cards Interativos** - Informações detalhadas de cada alocação

### 📈 **Projeção Patrimonial**

- **Gráficos Dinâmicos** - Visualizações interativas
- **Cenários Futuros** - Projeções baseadas em dados
- **Tabelas de Dados** - Informações estruturadas
- **Exportação** - Relatórios em diferentes formatos

### 💰 **Gestão de Movimentações**

- **Formulários Inteligentes** - Validação em tempo real
- **Histórico Completo** - Todas as operações registradas
- **Categorização** - Organização por tipo de movimentação
- **Relatórios** - Análise detalhada de movimentações

### 🛡️ **Gestão de Seguros**

- **Cadastro de Apólices** - Informações completas
- **Controle de Vencimentos** - Alertas automáticos
- **Cálculo de Cobertura** - Análise de proteção
- **Relatórios de Seguros** - Visão consolidada

### 📱 **Interface Responsiva**

- **Sidebar Inteligente** - Navegação adaptável
- **Menu Mobile** - Hambúrguer para dispositivos pequenos
- **Design Moderno** - Interface limpa e profissional
- **Navegação Intuitiva** - Fácil acesso a todas as funcionalidades

### 🔧 **Recursos Técnicos**

- **Validação de Formulários** - React Hook Form + Zod
- **Gerenciamento de Estado** - TanStack Query
- **Cache Inteligente** - Otimização de performance
- **TypeScript** - Tipagem estática para maior confiabilidade

## 🔧 Configuração da API

A URL da API é configurada através da variável de ambiente:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Para Docker, a URL é automaticamente configurada para `http://backend:3001`.

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
