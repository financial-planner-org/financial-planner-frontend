// Constantes para mensagens e textos
export const MESSAGES = {
  // Mensagens de sucesso
  success: {
    simulationCreated: 'Simulação criada com sucesso!',
    simulationUpdated: 'Simulação atualizada com sucesso!',
    simulationDeleted: 'Simulação removida com sucesso!',
    simulationDuplicated: 'Simulação duplicada com sucesso!',
    allocationCreated: 'Alocação criada com sucesso!',
    allocationUpdated: 'Alocação atualizada com sucesso!',
    allocationDeleted: 'Alocação removida com sucesso!',
    movementCreated: 'Movimentação criada com sucesso!',
    movementUpdated: 'Movimentação atualizada com sucesso!',
    movementDeleted: 'Movimentação removida com sucesso!',
    insuranceCreated: 'Seguro criado com sucesso!',
    insuranceUpdated: 'Seguro atualizado com sucesso!',
    insuranceDeleted: 'Seguro removido com sucesso!',
  },

  // Mensagens de erro
  error: {
    generic: 'Ocorreu um erro inesperado. Tente novamente.',
    network: 'Erro de conexão. Verifique sua internet e tente novamente.',
    notFound: 'Recurso não encontrado.',
    validation: 'Dados inválidos. Verifique os campos e tente novamente.',
    server: 'Erro interno do servidor. Tente novamente mais tarde.',
    timeout: 'Tempo limite excedido. Tente novamente.',
    simulationNotFound: 'Simulação não encontrada.',
    allocationNotFound: 'Alocação não encontrada.',
    movementNotFound: 'Movimentação não encontrada.',
    insuranceNotFound: 'Seguro não encontrado.',
  },

  // Mensagens de confirmação
  confirm: {
    deleteSimulation: 'Tem certeza que deseja remover esta simulação?',
    deleteAllocation: 'Tem certeza que deseja remover esta alocação?',
    deleteMovement: 'Tem certeza que deseja remover esta movimentação?',
    deleteInsurance: 'Tem certeza que deseja remover este seguro?',
    duplicateSimulation: 'Deseja duplicar esta simulação?',
    createVersion: 'Deseja criar uma nova versão desta simulação?',
  },

  // Mensagens de loading
  loading: {
    simulations: 'Carregando simulações...',
    allocations: 'Carregando alocações...',
    movements: 'Carregando movimentações...',
    saving: 'Salvando...',
    deleting: 'Removendo...',
    creating: 'Criando...',
    updating: 'Atualizando...',
  },

  // Mensagens de estado vazio
  empty: {
    simulations: 'Nenhuma simulação encontrada.',
    allocations: 'Nenhuma alocação encontrada.',
    movements: 'Nenhuma movimentação encontrada.',
    insurance: 'Nenhum seguro encontrado.',
    projections: 'Nenhuma projeção disponível.',
    history: 'Nenhum histórico disponível.',
  },

  // Placeholders
  placeholder: {
    search: 'Pesquisar...',
    select: 'Selecione uma opção...',
    name: 'Digite o nome...',
    description: 'Digite a descrição...',
    amount: 'Digite o valor...',
    date: 'Selecione a data...',
    email: 'Digite o e-mail...',
    phone: 'Digite o telefone...',
  },

  // Labels de formulário
  labels: {
    name: 'Nome',
    description: 'Descrição',
    amount: 'Valor',
    date: 'Data',
    status: 'Status',
    type: 'Tipo',
    category: 'Categoria',
    email: 'E-mail',
    phone: 'Telefone',
    address: 'Endereço',
    city: 'Cidade',
    state: 'Estado',
    zipCode: 'CEP',
    country: 'País',
  },

  // Títulos de seções
  titles: {
    dashboard: 'Dashboard',
    simulations: 'Simulações',
    allocations: 'Alocações',
    movements: 'Movimentações',
    insurance: 'Seguros',
    projections: 'Projeções',
    history: 'Histórico',
    settings: 'Configurações',
    profile: 'Perfil',
  },

  // Descrições de seções
  descriptions: {
    dashboard: 'Visão geral das suas informações financeiras',
    simulations: 'Gerencie suas simulações patrimoniais',
    allocations: 'Gerencie seus investimentos e alocações',
    movements: 'Acompanhe suas movimentações financeiras',
    projections: 'Visualize projeções patrimoniais',
    history: 'Histórico de simulações e alterações',
    settings: 'Configurações do sistema',
    profile: 'Informações do seu perfil',
  },
} as const;
