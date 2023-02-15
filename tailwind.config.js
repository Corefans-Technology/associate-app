/** @type {svgToTinyDataUri | ((svgString: string) => string)} */

const svgToDataUri = require("mini-svg-data-uri");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Euclid Circular B", "sans-serif"],
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
        orange: "#FF9E0B",
        red: "#E52053",
        beerus: "#EBEBEB",
        "gray-1": "#626E8B",
        "gray-2": "#667085",
        "light-grey": "#D9D9D9",
        "light-grey-2": "#98A2B3",
        "light-grey-3": "#EDEDED",
        "light-trunks": "#999CA0",
        error: "#FF6666",
        green: "#00A438",
        D0C9C9: "#D0C9C9",
        E5E5E5: "#E5E5E5",
        "09121F": "#09121F",
        F6F6F6: "#F6F6F6",
        "626E8B": "#626E8B",
        "1E1D24": "#1E1D24",
        "333333": "#333333",
        "434345": "#434345",
        "727273": "#727273",
        FDFBFB: "#FDFBFB",
        "FAFAFB": "#FAFAFB",
        "EAECF0": "#EAECF0",
        "7B7B7B": "#7B7B7B",
        "999CA0": "#999CA0",
        "98A2B3": "#98A2B3",
        "272643": "#272643",
        "#EBEBEB": "#EBEBEB",
        "D5D5D5": "#D5D5D5",
        "F2F4F7": "#F2F4F7",
        "#2E0B34": "#2E0B34",
        "#FFFBF7": "#FFFBF7",
        "#FFF9F3": "#FFF9F3",
        "#1D2939": "#1D2939",
        "#F7F7F7": "#F7F7F7",
        "#D0C9C9": "#D0C9C9",
        "#FF9E0B": "#FF9E0B",
        "#222222": "#222222",
        "#737373": "#737373",
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
