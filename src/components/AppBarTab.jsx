import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
  },
  tabText: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 18,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.tab}>
      <Text style={styles.tabText}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
