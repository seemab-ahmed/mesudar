/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1600px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        dunbar: ['"Dunbar Tall"'],
        causten: ['"Causten Regular"'],
      },
      colors: {
        "dark-navy": "#2A283E",
        "tomato-red": "#E03C33",
        "banana-yellow": "#fdc211",
        "light-gray": "#5B5A69",
      },
      maxWidth: {
        "container-xl": "1740px",
      },
      boxShadow: {
        'custom-xl': '5px 9px 14px 5px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
