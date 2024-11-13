import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useQuery } from "@apollo/client";
import queries from "../graphql/queries";
import { Link, useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

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
  titleText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
});

const AppBarTitle = ({ children }) => (
  <Text style={styles.titleText}>{children}</Text>
);

const AppBar = () => {
  const currentUser = useQuery(queries.GET_CURRENT_USER).data?.me;
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab>
          <Link to="/">
            <AppBarTitle>Repositories</AppBarTitle>
          </Link>
        </AppBarTab>
        {!currentUser && (
          <AppBarTab>
            <Link to="/signin">
              <AppBarTitle>Sign in</AppBarTitle>
            </Link>
          </AppBarTab>
        )}
        {currentUser && (
          <AppBarTab>
            <Pressable
              onPress={async () => {
                await authStorage.removeAccessToken();
                await apolloClient.resetStore();

                navigate("/signin");
              }}
            >
              <AppBarTitle>Sign out</AppBarTitle>
            </Pressable>
          </AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
