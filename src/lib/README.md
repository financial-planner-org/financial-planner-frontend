# Biblioteca Centralizada - Financial Planner

Esta biblioteca centraliza toda a lógica de negócio, constantes, tipos e utilitários do Financial Planner.

## Estrutura

```
src/lib/
├── api/                    # Configurações e clientes de API
│   └── index.ts           # Cliente Axios centralizado
├── constants/             # Constantes organizadas por módulo
│   ├── api.ts            # Configurações de API e endpoints
│   ├── data.ts           # Configurações de dados e transformações
│   ├── messages.ts       # Mensagens e textos da aplicação
│   ├── pages.ts          # Configurações de páginas
│   ├── routes.ts         # Rotas e navegação
│   ├── styles.ts         # Estilos e classes CSS
│   ├── ui.ts             # Configurações de UI
│   ├── validation.ts     # Configurações de validação
│   └── index.ts          # Exportações centralizadas
├── hooks/                 # Hooks customizados
│   └── index.ts          # Hooks para React Query e utilitários
├── services/              # Serviços de negócio
│   └── index.ts          # Serviços para cada entidade
├── types/                 # Definições de tipos TypeScript
│   └── core.ts           # Tipos principais da aplicação
├── utils/                 # Utilitários gerais
│   └── utils.ts          # Funções utilitárias
├── validations/           # Validações com Zod
│   └── index.ts          # Schemas de validação
├── providers/             # Providers do React
│   └── query-provider.tsx # Provider do React Query
└── index.ts              # Exportações principais
```

## Módulos

### API (`/api`)
- Cliente Axios centralizado
- Interceptors para autenticação e tratamento de erros
- Métodos para todas as entidades (simulações, alocações, etc.)

### Constantes (`/constants`)
- **api.ts**: Endpoints, códigos HTTP, configurações de retry
- **data.ts**: Formatos de dados, transformações, cache
- **messages.ts**: Mensagens de sucesso, erro, loading
- **pages.ts**: Configurações de layout e páginas
- **routes.ts**: Rotas e navegação
- **styles.ts**: Classes CSS e estilos responsivos
- **ui.ts**: Configurações de UI e componentes
- **validation.ts**: Configurações de validação

### Serviços (`/services`)
- Lógica de negócio centralizada
- Transformação de dados
- Tratamento de erros
- Serviços para cada entidade:
  - `SimulationService`
  - `AllocationService`
  - `MovementService`
  - `InsuranceService`
  - `ClientService`

### Hooks (`/hooks`)
- Hooks para React Query
- Hooks utilitários (localStorage, debounce, async)
- Hooks para cada entidade com cache automático

### Validações (`/validations`)
- Schemas Zod para validação
- Validações customizadas (CPF, CNPJ, datas)
- Tipos inferidos dos schemas
- Utilitários de validação

### Tipos (`/types`)
- Definições TypeScript
- Interfaces para todas as entidades
- DTOs para API
- Estados de UI

### Utilitários (`/utils`)
- Funções de formatação
- Utilitários de CSS (cn)
- Helpers gerais

## Uso

### Importação Centralizada
```typescript
import { 
  SimulationService, 
  useSimulations, 
  MESSAGES, 
  API_ENDPOINTS 
} from '@/lib';
```

### Uso de Serviços
```typescript
// Buscar simulações
const simulations = await SimulationService.getAll();

// Criar simulação
const newSimulation = await SimulationService.create(data);
```

### Uso de Hooks
```typescript
// Hook para simulações
const { data: simulations, isLoading, error } = useSimulations();

// Hook para criar simulação
const createSimulation = useCreateSimulation();
```

### Uso de Constantes
```typescript
// Mensagens
console.log(MESSAGES.success.simulationCreated);

// Estilos
<div className={COMMON_STYLES.card}>

// API
const response = await apiClient.get(API_ENDPOINTS.simulations.list);
```

## Benefícios

1. **Organização**: Estrutura clara e modular
2. **Reutilização**: Código centralizado e reutilizável
3. **Manutenibilidade**: Fácil de manter e atualizar
4. **Type Safety**: Tipos TypeScript em toda a aplicação
5. **Performance**: Cache automático com React Query
6. **Consistência**: Padrões uniformes em toda a aplicação
7. **Escalabilidade**: Fácil de adicionar novas funcionalidades

## Padrões

- **Nomenclatura**: PascalCase para classes, camelCase para funções
- **Estrutura**: Um arquivo por responsabilidade
- **Exports**: Exportações nomeadas para melhor tree-shaking
- **Error Handling**: Tratamento consistente de erros
- **Cache**: Configuração centralizada de cache
- **Validação**: Validação com Zod em todas as entradas
