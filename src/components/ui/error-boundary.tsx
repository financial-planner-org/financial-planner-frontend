/**
 * @fileoverview Error Boundary padrão do design system
 * @description Componente para capturar e tratar erros de renderização
 */

'use client';

import * as React from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /**
   * Função opcional para tratar erros (logging, analytics, etc.)
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /**
   * Componente customizado para exibir o erro
   */
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

/**
 * Boundary para capturar erros de renderização.
 * Previne que erros JavaScript quebrem toda a aplicação.
 *
 * @param {ErrorBoundaryProps} props - Props do error boundary
 * @param {React.ReactNode} props.children - Componentes filhos
 * @param {function} [props.onError] - Função para tratar erros
 * @param {React.ComponentType} [props.fallback] - Componente customizado para erro
 * @returns {JSX.Element} Error boundary renderizado
 *
 * @example
 * ```tsx
 * // Error boundary básico
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // Error boundary com logging
 * <ErrorBoundary
 *   onError={(error, errorInfo) => {
 *     console.error('Error capturado:', error)
 *     // Enviar para serviço de monitoramento
 *     // analytics.track('error', { message: error.message })
 *   }}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // Error boundary com fallback customizado
 * const CustomErrorFallback = ({ error, resetError }) => (
 *   <div className="text-center p-8">
 *     <h2>Algo deu errado</h2>
 *     <p>{error?.message}</p>
 *     <Button onClick={resetError}>Tentar novamente</Button>
 *   </div>
 * )
 *
 * <ErrorBoundary fallback={CustomErrorFallback}>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // Error boundary em uma página
 * function MyPage() {
 *   return (
 *     <ErrorBoundary>
 *       <div>
 *         <Header />
 *         <MainContent />
 *         <Footer />
 *       </div>
 *     </ErrorBoundary>
 *   )
 * }
 * ```
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Atualiza o state para renderizar a UI de erro
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log do erro
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);

    // Atualiza o state com informações do erro
    this.setState({
      error,
      errorInfo,
    });

    // Chama a função onError se fornecida
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Se foi fornecido um fallback customizado, usa ele
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      // Fallback padrão
      return (
        <div className='min-h-[400px] flex items-center justify-center p-4'>
          <Card className='w-full max-w-md'>
            <CardHeader>
              <CardTitle className='text-destructive'>Erro inesperado</CardTitle>
              <CardDescription>Algo deu errado ao carregar este conteúdo.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {this.state.error && (
                <div className='p-3 bg-destructive/10 rounded-md'>
                  <p className='text-sm text-destructive font-mono'>{this.state.error.message}</p>
                </div>
              )}

              <div className='flex gap-2'>
                <Button onClick={this.resetError} variant='outline'>
                  Tentar novamente
                </Button>
                <Button onClick={() => window.location.reload()}>Recarregar página</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook para usar error boundary em componentes funcionais.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { handleError, ErrorFallback } = useErrorHandler()
 *
 *   const handleAsyncOperation = async () => {
 *     try {
 *       await riskyOperation()
 *     } catch (error) {
 *       handleError(error)
 *     }
 *   }
 *
 *   return (
 *     <ErrorFallback>
 *       <div>
 *         <Button onClick={handleAsyncOperation}>
 *           Operação arriscada
 *         </Button>
 *       </div>
 *     </ErrorFallback>
 *   )
 * }
 * ```
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
    console.error('Erro capturado pelo hook:', error);
  }, []);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const ErrorFallback = React.useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (error) {
        return (
          <div className='min-h-[200px] flex items-center justify-center p-4'>
            <Card className='w-full max-w-md'>
              <CardHeader>
                <CardTitle className='text-destructive'>Erro na operação</CardTitle>
                <CardDescription>{error.message}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={resetError}>Tentar novamente</Button>
              </CardContent>
            </Card>
          </div>
        );
      }

      return <>{children}</>;
    },
    [error, resetError]
  );

  return {
    error,
    handleError,
    resetError,
    ErrorFallback,
  };
}

export { ErrorBoundary };
