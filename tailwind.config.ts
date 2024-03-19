const { nextui } = require("@nextui-org/react")

import type { Config } from "tailwindcss"

// https://hihayk.github.io/scale/#4/6/50/80/-51/67/20/14/5D2A38/93/42/56/white
// http://colormind.io/

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        keldan: {
          extend: "light", // <- inherit default values from dark theme
          colors: {
            background: "#F6F6F7",
            foreground: "#191919",
            primary: {
              "50": "#D6F3EB",
              "100": "#BCEAE6",
              "200": "#A2DAE0",
              "300": "#88C0D6",
              "400": "#6FA0CC",
              "500": "#577BC1",
              "600": "#3F51B5",
              "700": "#3C35A0",
              "800": "#462C8B",
              "900": "#4B2475",
              A900: "4A1B5F",

              DEFAULT: "#3F51B5",
              foreground: "#F6F6F7",
            },
            secondary: {
              "50": "#DBD3E0",
              "100": "#C6B7CA",
              "200": "#B59AB5",
              "300": "#9F7E9A",
              "400": "#89627B",
              "500": "#73465B",
              "600": "#5D2A38",
              "700": "#522427",
              "800": "#47241E",
              "900": "#3C2519",
              A900: "302413",

              DEFAULT: "#73465B",
              foreground: "#F6F6F7",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
}
export default config
