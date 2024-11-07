import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

const PADDING = 30;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: PADDING,
    paddingTop: Constants.statusBarHeight + PADDING,
    backgroundColor: "#646464",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={"Repositories"} />
    </View>
  );
};

export default AppBar;
