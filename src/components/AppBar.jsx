import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const PADDING = 30;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: PADDING,
    paddingTop: Constants.statusBarHeight + PADDING,
    backgroundColor: theme.backdropColor,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={"Repositories"} destination={"/"} />
      <AppBarTab text={"Sign In"} destination={"/signin"} />
    </View>
  );
};

export default AppBar;
