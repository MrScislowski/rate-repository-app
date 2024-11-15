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

  const { data, loading, refetch, fetchMore, ...result } = useQuery(
    queries.GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        orderBy,
        orderDirection,
        searchKeyword,
        first: 2,
        after: "",
      },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result,
  };
};

export default useRepositories;
