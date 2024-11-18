import { useParams } from "react-router-native";
import RepositoryItemSummary from "./RepositoryItemSummary";
import { useQuery } from "@apollo/client";
import queries from "../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import Review from "./Review";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backdropColor,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();

  const reviewQuery = useQuery(queries.GET_REPOSITORY_REVIEWS_BY_ID, {
    variables: { repositoryId: id, first: 4 },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    if (
      !reviewQuery.loading &&
      reviewQuery?.data.repository.reviews.pageInfo.hasNextPage
    ) {
      reviewQuery.fetchMore({
        variables: {
          after: reviewQuery.data.repository.reviews.pageInfo.endCursor,
        },
      });
    }
  };

  return (
    <FlatList
      data={reviewQuery?.data?.repository?.reviews?.edges || []}
      renderItem={({ item }) => <Review review={item.node} />}
      ListHeaderComponent={<RepositoryItemSummary />}
      ItemSeparatorComponent={<ItemSeparator />}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
