module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      third: "rgb(var(--color-third) / <alpha-value>)",
    },
    extend: {},
    screens: {
      mobile: "300px",
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1050px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
