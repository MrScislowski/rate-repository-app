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
  button: {
    backgroundColor: "#005eff",
    margin: 10,
    padding: 10,
    color: "#ffffff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
  },
};

export default theme;
