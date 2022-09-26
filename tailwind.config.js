/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class", // or 'media' or 'class',
  mode: "jit",
  theme: {
    fontFamily: {
     'sans': ['acumin-pro', 'sans-serif'],
    },
    extend: {
        screens: {
          'xxl': {'min': '1400px'},
        },
        borderWidth: {
          '1.5': '1.5px',
        },
        backgroundSize: {
            '100': '100% 100%'
        },
        zIndex: {
          '60': '60',
          '70': '70',
          '80': '80',
          '90': '90',
          '100': '100',
          '110': '110',
          '120': '120',
         },
        fontSize: {
          'xxxs': '0.625rem',
          'xxs': '.688rem',
          'base-x': '1.125rem',
          'x-sm': '0.813rem'
        },
        padding: {
          '1/2': '50%',
          full: '100%'
        },
        colors: {
          primary: {
            faint: '#EDFDF2',
            light: '#67db89',
            DEFAULT: '#1CD155',
            1: "#AAF4C0",
            2: "#DDF8E6",
            3: "#1D3A26",
            dark: '#0bc142'
          },
          secondary: {
            light: "#F5F5F5",
            DEFAULT: '#F0F0F0',
            1: "#FCFCFC",
            2: "#F7F7F7",
            3: "#FAFAFA",
            4: "#D4D4D4",
            5: "#4D4D4D",
            6: "#D1D1D1",
            7: "#FDFDFD",
            8: "#F9F9F9",
            dark: "#E6E6E6"
          },
          dark: {
            DEFAULT: '#1C1C1C',
            1: "#666666",
            2: "#999999",
            3: "#2E2E2E",
            4: "#2D2C2C",
            5: "#292929",
            6: "#1F1F1F",
            7: "#242424",
            8: "#B0B0B0"
          },
          crypto: {
            DEFAULT: '#060611',
            1: "#13171D",
            2: "#17171E"
          },
          gray: {
            1: "#aaaaaa",
            2: "#cccccc",
            3: "#A0A1A3",
            350: '#2E2E2E',
            450: '#242E26'
          },
          yellow: {
            250: "#FFDC26",
            1: "#FFAF29",
            2: "#FF7E20",
            3: "#FFDD29",
            4: "#C2A300",
            5: "#FEEC9A",
            6: "#FDF1B5",
            7: "#FFD700"
          },
          demo: {
            DEFAULT: "#349DFE"
          },
          success: {
            light: "#DBFAE5",
            DEFAULT: "#17AB46",
            1: "#1CD155"
          },
          danger: {
            light: "#FDE3E3",
            DEFAULT: "#E21215",
            1: "#EC191C",
            2: "#E33131",
            3: "#FF595B",
            4: "#FE4E63",
            5: "#FF4C8D",
            6: "#FF0000"
          },
          pending: {
            light: "#FFE9D1",
            DEFAULT: "#E07300"
          },
          warn: {
            DEFAULT: "#F9941C",
            1: "#B71006",
            2: "#FDAC33",
            3: "#F79E1B"
          },
          info: {
            DEFAULT: "#1A1A1A",
            1: "#349DFE"
          },
          green: {
            1: "#EDFDF2",
            2: "#236B51",
            3: "#D9F4C4"
          },
          pink: {
            1: "#FFD7F1"
          },
          blue: {
            1: "#EBF9FF"
          },
          peach: {
            1: "#FFF0EB"
          },
        }
      }
  },
  variants: {
    
    extend: {
      borderColor: ['valid', 'invalid', 'dark'],
      backgroundColor: ['disabled', 'dark'],
      textColor: ['disabled', 'dark']

    },
  },
  plugins: [],
}
