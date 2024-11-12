import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const apolloClient = createApolloClient();
const authStorage = new AuthStorage();

export default function App() {
  return (
    <NativeRouter>
      <AuthStorageContext.Provider value={authStorage}>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </AuthStorageContext.Provider>
    </NativeRouter>
  );
}
