import { StyleSheet, Text, Pressable } from "react-native";
import { Link } from "react-router-native";

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

const AppBarTab = ({ text, destination }) => {
  return (
    <Link style={styles.tab} to={destination}>
      <Text style={styles.tabText}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
