import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ClientWrapper } from "@/components/layout/client-wrapper";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ClientProvider } from "@/contexts/ClientContext";

// Configuração da fonte Inter do Google Fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Constantes para o layout
const LAYOUT_CONFIG = {
  language: 'pt-BR',
  title: 'Financial Planner',
  description: 'Planejador financeiro pessoal'
} as const;

export const metadata: Metadata = {
  title: LAYOUT_CONFIG.title,
  description: LAYOUT_CONFIG.description,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LAYOUT_CONFIG.language} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <ClientProvider>
            <Providers>
              <ClientWrapper>{children}</ClientWrapper>
            </Providers>
          </ClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
