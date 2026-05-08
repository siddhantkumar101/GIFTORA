/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        coral: "#f35f4c",
        mint: "#14b8a6",
        lemon: "#f6c453",
        cloud: "#f5f7fb"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 32, 51, 0.12)"
      }
    }
  },
  plugins: []
};
