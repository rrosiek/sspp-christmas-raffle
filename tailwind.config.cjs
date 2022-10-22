const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "christmas-gold": "#cb9e61",
        "christmas-red": "#ce2f36",
        "christmas-dark-red": "#7f3037",
      },
      fontFamily: {
        sans: ["Josefin\\ Sans", ...defaultTheme.fontFamily.sans],
        display: ["Oswald", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
