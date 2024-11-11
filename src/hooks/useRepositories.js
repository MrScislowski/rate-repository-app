import { useQuery } from "@apollo/client";
import queries from "../graphql/queries";

const useRepositories = () => {
  const queryResult = useQuery(queries.GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: queryResult.data?.repositories,
    loading: queryResult.loading,
    refetch: queryResult.refetch,
  };
};

export default useRepositories;
