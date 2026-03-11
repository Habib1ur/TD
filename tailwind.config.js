/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        game: {
          bgFrom: "#0f172a",
          bgVia: "#172554",
          bgTo: "#0f766e",
          card: "#ffffff1a",
          cardBorder: "#ffffff33",
        },
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(255,255,255,0.2)" },
          "50%": { boxShadow: "0 0 28px rgba(255,255,255,0.5)" },
        },
      },
      animation: {
        floatSlow: "floatSlow 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
