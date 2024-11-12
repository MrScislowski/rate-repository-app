import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useQuery } from "@apollo/client";
import queries from "../graphql/queries";

const PADDING = 30;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: PADDING,
    paddingTop: Constants.statusBarHeight + PADDING,
    backgroundColor: theme.backdropColor,
  },
});

const AppBar = () => {
  const currentUser = useQuery(queries.GET_CURRENT_USER);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={"Repositories"} destination={"/"} />
        <AppBarTab
          text={currentUser ? "Sign Out" : "Sign In"}
          destination={currentUser ? "/signout" : "/signin"}
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
