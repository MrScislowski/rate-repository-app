import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    // POWERSHELL:
    // Get-NetIPConfiguration | Where-Object { $_.InterfaceAlias -eq "Wi-Fi"} | Select-Object -Property IPv4Address
    // MAC:
    // ifconfig | grep 192.160.0
    uri: "http://192.168.0.133:4000/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
