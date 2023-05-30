/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        trance: "trance 5s linear infinite",
        tranceBg: "tranceBg 5s linear infinite",
        bodyBg: "bodyBg 3s ease-in-out infinite",
        gridTrance: "gridTrance 5s linear infinite",
        curl: "curl 2s ease-out .5s both",
      },
      keyframes: {
        trance: {
          "0%, 100%": { color: "#10b981" },
          "50%": { color: "#001aff" },
        },
        tranceBg: {
          "0%, 100%": { background: "#10b981" },
          "50%": { background: "#001aff" },
        },
        bodyBg: {
          "0%, 100%": { background: "#ffd700" },
          "20%, 80%": { background: "#ffa700" },
          "50%": { background: "#ffff00" },
        },
        gridTrance: {
          "0%, 100%": { color: "rgb(220 252 231)" },
          "50%": { color: "rgb(134 239 172)" },
        },
        curl: {
          "0%": {
            opacity: 0,
            filter: "blur(1rem)",
            borderLeft: "50px solid var(--main-color)",
            borderRight: "50px solid var(--main-color)",
            borderRadius: "-10%",
          },
          "50%": {
            opacity: 1,
            filter: "blur(0)",
            borderLeft: "25px solid var(--main-color)",
            borderRight: "25px solid var(--main-color)",
            borderRadius: 0,
          },
          "100%": {
            borderLeft: "15px solid var(--main-color)",
            borderRight: "15px solid var(--main-color)",
            borderRadius: "10%",
          },
        },
      },
    },
    plugins: [require("@tailwindcss/forms"), "react"],
  },
};
