export { QueryClientProviderWrapper } from './query-client';
export { ThemeProvider } from './theme-provider';

import React from 'react';
import { QueryClientProviderWrapper } from './query-client';
import { ThemeProvider } from './theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return React.createElement(
    QueryClientProviderWrapper,
    null,
    React.createElement(ThemeProvider, null, children)
  );
}
