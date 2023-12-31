/** @type {svgToTinyDataUri | ((svgString: string) => string)} */

const svgToDataUri = require("mini-svg-data-uri");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // sans: ["\"Euclid Circular B\"", "sans-serif"],
      sans: ["\"Gilroy\"", "sans-serif"],
      gilroy: ["\"Gilroy\"", "sans-serif"],
      // power: ["\"Power Grotesk\"", "sans-serif"],
      power: ["\"Power Grotesk\"", "sans-serif"],
      // power: ["\"PowerGroteskTrialUltBd\""],
    },
    extend: {
      backgroundImage: (theme) => ({
        "multiselect-caret": `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>`,
        )}")`,
      }),
      colors: {
        orange: "#F18B1B",
        red: "#E52053",
        beerus: "#EBEBEB",
        "grey-1": "#626E8B",
        "light-grey": "#D9D9D9",
        "light-grey-2": "#98A2B3",
        "light-grey-3": "#EDEDED",
        "light-trunks": "#999CA0",
        error: "#F51211",
        green: "#42C458",
        D0C9C9: "#D0C9C9",
        E5E5E5: "#E5E5E5",
        F6F6F6: "#F6F6F6",
        "626E8B": "#626E8B",
        "1E1D24": "#1E1D24",
        "333333": "#333333",
        "727273": "#727273",
        "7D7C80": "#7D7C80",
        FDFBFB: "#FDFBFB",
        "FAFAFB": "#FAFAFB",
        "EAECF0": "#EAECF0",
        "7B7B7B": "#7B7B7B",
        "999CA0": "#999CA0",
        "98A2B3": "#98A2B3",
        "#EBEBEB": "#EBEBEB",
        "D5D5D5": "#D5D5D5",
        "F2F4F7": "#F2F4F7",
        "#667085": "#667085",
        "#2E0B34": "#2E0B34",
        "#FFFBF7": "#FFFBF7",
        "#FFF9F3": "#FFF9F3",
        "#1D2939": "#1D2939",
        "#F7F7F7": "#F7F7F7",
        "#D0C9C9": "#D0C9C9",
        "#FF9E0B": "#FF9E0B",
        "#222222": "#222222",
        "#737373": "#737373",
        "#DCDCE4": "#DCDCE4",
        "#D5D8DD": "#D5D8DD",
        "#2D1713": "#2D1713",
        "#3A2622": "#3A2622",
        "#808080": "#808080",
        "#7D7C80": "#7D7C80",
        "#A3A2A5": "#A3A2A5",
        "#252733": "#252733",
        "#333333": "#333333",
        "#0A0B0D": "#0A0B0D",
        "#220B07": "#220B07",
        "#7B7B7B": "#7B7B7B",
        "#7189A7": "#7189A7",
        "#091C35": "#091C35",
        "#3A495D": "#3A495D",
        "#FEF3E8": "#FEF3E8",
        "#151419": "#151419",
        "#444349": "#444349",
        "#121216": "#121216",
        "#E9E8E9": "#E9E8E9",
        "#101828": "#101828",
        "#EAEAEA": "#EAEAEA",
        "#697386": "#697386"
      },
      aria: {
        invalid: "true",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
