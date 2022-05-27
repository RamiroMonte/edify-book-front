import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    white: {
      500: "#ffffff",
    },
    black: {
      500: "#1F140F",
    },
    background: {
      100: "#f4b886",
      200: "#f2ac72",
      300: "#f1a15e",
      400: "#ef954a",
      500: "#ed8936",
      600: "#d57b31",
      700: "#be6e2b",
      800: "#a66026",
      900: "#8e5220",
    },
  },
  components: {
    Button: { baseStyle: { _focus: { boxShadow: "none" } } },
    Link: { baseStyle: { _focus: { boxShadow: "none" } } },
  },
});

export default theme;
