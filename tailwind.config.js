export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E30B5C",
        "primary-light": "#FF4081",
        "primary-dark": "#B8094A",
        secondary: "#0A0A0A",
        accent: "#FFD700",
        dark: "#000000",
        "dark-lighter": "#1A1A1A",
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
