import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

/**
 * Provedor de tema para a aplicação
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.children - Componentes filhos
 * @param {string} [props.attribute='class'] - Atributo para aplicar o tema (padrão: 'class')
 * @param {string} [props.defaultTheme='system'] - Tema padrão (padrão: 'system')
 * @param {boolean} [props.enableSystem] - Se deve habilitar a detecção do tema do sistema
 * @param {boolean} [props.enableColorScheme] - Se deve habilitar o suporte a prefers-color-scheme
 * @param {string} [props.storageKey='theme'] - Chave para armazenar o tema no armazenamento local
 * @param {string[]} [props.themes] - Lista de temas disponíveis
 * @param {string} [props.value] - Valor atual do tema (controlado)
 * @param {Function} [props.onChange] - Callback chamado quando o tema é alterado
 * @returns {JSX.Element} Provedor de tema
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

/**
 * Hook personalizado para acessar o tema atual e funções relacionadas
 * @returns {Object} Objeto com o tema atual e funções para manipulá-lo
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, themes, systemTheme } = useNextTheme();

  const isDark = resolvedTheme === 'dark';
  const isSystem = theme === 'system';
  const currentTheme = isSystem ? systemTheme : resolvedTheme;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    themes,
    systemTheme,
    isDark,
    isSystem,
    currentTheme,
    toggleTheme,
  };
}
