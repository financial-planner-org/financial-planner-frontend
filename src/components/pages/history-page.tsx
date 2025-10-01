'use client';

import { ReactNode } from 'react';
import { PageLayout, PageHeader, PageCard, DataCard, StatusBadge, LoadingState, ErrorState, EmptyState } from '@/components/common/page-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LegacyWarning } from '@/components/ui/legacy-warning';
import { MoreHorizontal, Eye, Edit, Trash2, Copy, Calendar } from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

interface HistoryItem {
  id: string;
  clientName: string;
  simulationName: string;
  version: number;
  createdAt: string;
  totalPatrimony: number;
  retirementYear: number;
  isLegacy: boolean;
  canEdit: boolean;
}

interface HistoryPageProps {
  history: HistoryItem[];
  isLoading: boolean;
  error?: string;
  onViewSimulation: (id: string) => void;
  onReopenSimulation: (id: string) => void;
  onCreateFromLegacy: (id: string) => void;
  onEditSimulation: (id: string) => void;
  onDeleteSimulation: (id: string) => void;
  formatCurrency: (value: number) => string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function HistoryPage({
  history,
  isLoading,
  error,
  onViewSimulation,
  onReopenSimulation,
  onCreateFromLegacy,
  onEditSimulation,
  onDeleteSimulation,
  formatCurrency
}: HistoryPageProps) {
  if (isLoading) {
    return (
      <PageLayout>
        <PageHeader title="Histórico de Simulações" />
        <LoadingState message="Carregando histórico..." />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <PageHeader title="Histórico de Simulações" />
        <ErrorState message={error} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="Histórico de Simulações"
        description="Visualize e gerencie todas as simulações salvas"
      />

      {history.length === 0 ? (
        <EmptyState
          message="Nenhum histórico encontrado"
          action={
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Criar primeira simulação
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          {/* Resumo do histórico */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DataCard
              title="Total de Simulações"
              value={history.length.toString()}
              description="Simulações salvas"
            />
            <DataCard
              title="Versões Legadas"
              value={history.filter(item => item.isLegacy).length.toString()}
              description="Simulações antigas"
            />
            <DataCard
              title="Editáveis"
              value={history.filter(item => item.canEdit).length.toString()}
              description="Simulações ativas"
            />
            <DataCard
              title="Patrimônio Médio"
              value={formatCurrency(
                history.reduce((sum, item) => sum + item.totalPatrimony, 0) / history.length
              )}
              description="Valor médio das simulações"
            />
          </div>

          {/* Lista de simulações */}
          <PageCard title="Simulações Salvas">
            <div className="space-y-4">
              {history.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onView={onViewSimulation}
                  onReopen={onReopenSimulation}
                  onCreateFromLegacy={onCreateFromLegacy}
                  onEdit={onEditSimulation}
                  onDelete={onDeleteSimulation}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          </PageCard>
        </div>
      )}
    </PageLayout>
  );
}

// ============================================================================
// COMPONENTE DE CARD DE HISTÓRICO
// ============================================================================

interface HistoryCardProps {
  item: HistoryItem;
  onView: (id: string) => void;
  onReopen: (id: string) => void;
  onCreateFromLegacy: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
}

function HistoryCard({
  item,
  onView,
  onReopen,
  onCreateFromLegacy,
  onEdit,
  onDelete,
  formatCurrency
}: HistoryCardProps) {
  return (
    <div className="flex items-center gap-4 p-6 border rounded-lg bg-card">
      {/* Ícone da simulação */}
      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
        <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
          <span className="text-orange-500 font-bold text-sm">
            {item.version}
          </span>
        </div>
      </div>

      {/* Informações da simulação */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-semibold text-foreground truncate">
            {item.simulationName}
          </h3>
          {item.isLegacy && (
            <LegacyWarning tooltip="Versão legada – não editável" />
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-2">
          Cliente: {item.clientName} • Versão {item.version} • {item.createdAt}
        </div>

        <div className="flex items-center gap-6 text-sm">
          <span className="text-foreground">
            Patrimônio: <strong>{formatCurrency(item.totalPatrimony)}</strong>
          </span>
          <span className="text-foreground">
            Aposentadoria: <strong>{item.retirementYear}</strong>
          </span>
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(item.id)}
        >
          <Eye className="w-4 h-4 mr-1" />
          Ver
        </Button>

        {item.canEdit && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(item.id)}
            >
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Deletar
            </Button>
          </>
        )}

        {item.isLegacy && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCreateFromLegacy(item.id)}
            className="text-orange-600 hover:text-orange-600"
          >
            <Copy className="w-4 h-4 mr-1" />
            Criar Nova
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
