/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				botao: "var(--botao)",
				cards: "var(--cards)",
				"variable-collection-cinza-claro":
					"var(--variable-collection-cinza-claro)",
				"variable-collection-cinza-m-dia":
					"var(--variable-collection-cinza-m-dia)",
				"variable-collection-custo-de-vida":
					"var(--variable-collection-custo-de-vida)",
				"variable-collection-laranja-escuro-botao":
					"var(--variable-collection-laranja-escuro-botao)",
				"variable-collection-plano-original":
					"var(--variable-collection-plano-original)",
				"variable-collection-salario": "var(--variable-collection-salario)",
				"variable-collection-situacao-atual":
					"var(--variable-collection-situacao-atual)",
				// Novas cores da paleta
				"sidebar-bg": "#101010",
				"sidebar-hover": "#434343",
				"sidebar-active": "#454545",
				"sidebar-text": "#9F9F9F",
				"sidebar-text-light": "#B1B1B1",
			},
		},
	},
	plugins: [],
};
