/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6A00",
        "primary-dark": "#CC5200",
        blackish: "#0D0D0D",
        "gray-light": "#F5F5F5",
        "accent-blue": "#1E3AFF",
        "accent-violet": "#6A00FF"
      },
      boxShadow: {
        md: "0px 2px 6px rgba(0,0,0,0.15)",
        lg: "0px 4px 12px rgba(0,0,0,0.25)"
      },
      borderRadius: {
        md: "8px",
        lg: "16px"
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
