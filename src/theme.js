import { Platform } from "react-native";

const theme = {
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  mainFontColor: "#000000",
  secondaryFontColor: "#3f3f3f",
  backdropColor: "#646464",
  submitColor: "#005eff",
};

export default theme;
