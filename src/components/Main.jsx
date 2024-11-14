import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import Text from "./Text";
import { Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import RepositoryItem from "./RepositoryItem";

export default function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<RepositoryItem />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
