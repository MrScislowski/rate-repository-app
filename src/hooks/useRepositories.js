import { useQuery } from "@apollo/client";
import queries from "../graphql/queries";

const useRepositories = ({ ordering, searchKeyword = "" }) => {
  let orderBy = "CREATED_AT"; // CREATED_AT or RATING_AVERAGE
  let orderDirection = "DESC"; // ASC or DESC

  if (ordering === "Highest Rated") {
    orderBy = "RATING_AVERAGE";
  }
  if (ordering === "Lowest Rated") {
    orderBy = "RATING_AVERAGE";
    orderDirection = "ASC";
  }

  const queryResult = useQuery(queries.GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
  });

  return {
    repositories: queryResult.data?.repositories,
    loading: queryResult.loading,
    refetch: queryResult.refetch,
  };
};

export default useRepositories;
