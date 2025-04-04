/** @type {import('tailwindcss').Config} */
module.exports = {
    // Dis à Tailwind où chercher les classes
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      // Ajoute d’autres chemins si besoin
    ],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary)",
          "primary-foreground": "var(--primary-foreground)",
          background: "var(--background)",
          foreground: "var(--foreground)",
          // etc. si tu as d’autres variables CSS
        },
      },
    },
    plugins: [
      // par exemple
      //require("tailwindcss-animate"),
    ],
  }
  