import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const createApolloClient = () => {
  return new ApolloClient({
    // POWERSHELL:
    // Get-NetIPConfiguration | Where-Object { $_.InterfaceAlias -eq "Wi-Fi"} | Select-Object -Property IPv4Address
    // MAC:
    // ifconfig | grep 192.160.0
    uri: Constants.expoConfig.extra.APOLLO_URL,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
