/**
 * @fileoverview Constantes de Formatação - Financial Planner
 * @description Centraliza funções e padrões de formatação de dados
 */

// Configurações de localização
export const LOCALE_CONFIG = {
  DEFAULT: 'pt-BR',
  CURRENCY: 'BRL',
  DATE_FORMAT: 'dd/MM/yyyy',
  TIME_FORMAT: 'HH:mm:ss',
  DATETIME_FORMAT: 'dd/MM/yyyy HH:mm:ss',
} as const;

// Funções de formatação
export const formatCurrency = (
  value: number,
  locale: string = LOCALE_CONFIG.DEFAULT,
  currency: string = LOCALE_CONFIG.CURRENCY
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (
  value: number,
  locale: string = LOCALE_CONFIG.DEFAULT,
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
};

export const formatPercent = (
  value: number,
  locale: string = LOCALE_CONFIG.DEFAULT,
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value / 100);
};

export const formatDate = (
  date: string | Date,
  locale: string = LOCALE_CONFIG.DEFAULT,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  }).format(dateObj);
};

export const formatDateTime = (
  date: string | Date,
  locale: string = LOCALE_CONFIG.DEFAULT,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  }).format(dateObj);
};

// Formatação de CPF
export const formatCPF = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Formatação de CNPJ
export const formatCNPJ = (cnpj: string): string => {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

// Formatação de telefone
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

// Formatação de CEP
export const formatCEP = (cep: string): string => {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
};

// Formatação de tamanho de arquivo
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Formatação de nome
export const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Formatação de inicial
export const formatInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

// Formatação de status
export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    draft: 'Rascunho',
    published: 'Publicado',
    archived: 'Arquivado',
    deleted: 'Excluído',
    enabled: 'Habilitado',
    disabled: 'Desabilitado',
    online: 'Online',
    offline: 'Offline',
    available: 'Disponível',
    unavailable: 'Indisponível',
  };

  return statusMap[status.toLowerCase()] || status;
};

// Formatação de tipo
export const formatType = (type: string): string => {
  const typeMap: Record<string, string> = {
    simulation: 'Simulação',
    allocation: 'Alocação',
    movement: 'Movimentação',
    insurance: 'Seguro',
    projection: 'Projeção',
    client: 'Cliente',
    user: 'Usuário',
    file: 'Arquivo',
    report: 'Relatório',
  };

  return typeMap[type.toLowerCase()] || type;
};

// Formatação de frequência
export const formatFrequency = (frequency: string): string => {
  const frequencyMap: Record<string, string> = {
    unique: 'Única',
    monthly: 'Mensal',
    annual: 'Anual',
    daily: 'Diária',
    weekly: 'Semanal',
    quarterly: 'Trimestral',
    biannual: 'Semestral',
  };

  return frequencyMap[frequency.toLowerCase()] || frequency;
};
