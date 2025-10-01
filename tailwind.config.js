/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Nova paleta de cores
				background: "var(--background)",
				"background-secondary": "var(--background-secondary)",
				"background-tertiary": "var(--background-tertiary)",
				
				foreground: "var(--foreground)",
				"foreground-secondary": "var(--foreground-secondary)",
				"foreground-muted": "var(--foreground-muted)",
				
				border: "var(--border)",
				"border-secondary": "var(--border-secondary)",
				"border-muted": "var(--border-muted)",
				
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
					hover: "var(--primary-hover)",
				},
				
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
					hover: "var(--secondary-hover)",
				},
				
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
					hover: "var(--accent-hover)",
				},
				
				success: {
					DEFAULT: "var(--success)",
					foreground: "var(--success-foreground)",
				},
				
				warning: {
					DEFAULT: "var(--warning)",
					foreground: "var(--warning-foreground)",
				},
				
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
					hover: "var(--destructive-hover)",
				},
				
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
					border: "var(--card-border)",
				},
				
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				
				// Cores específicas para finanças
				"financial-positive": "var(--financial-positive)",
				"financial-negative": "var(--financial-negative)",
				"financial-neutral": "var(--financial-neutral)",
				
				// Compatibilidade com cores antigas (manter por enquanto)
				botao: "var(--botao)",
				cards: "var(--cards)",
				"variable-collection-cinza-claro": "var(--variable-collection-cinza-claro)",
				"variable-collection-cinza-m-dia": "var(--variable-collection-cinza-m-dia)",
				"variable-collection-custo-de-vida": "var(--variable-collection-custo-de-vida)",
				"variable-collection-laranja-escuro-botao": "var(--variable-collection-laranja-escuro-botao)",
				"variable-collection-plano-original": "var(--variable-collection-plano-original)",
				"variable-collection-salario": "var(--variable-collection-salario)",
				"variable-collection-situacao-atual": "var(--variable-collection-situacao-atual)",
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
