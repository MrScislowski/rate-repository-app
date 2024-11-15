import { StyleSheet, FlatList, View, Alert } from "react-native";
import theme from "../theme";
import Review from "./Review";
import queries from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import mutations from "../graphql/mutations";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backdropColor,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, refetch } = useQuery(queries.GET_USER_REVIEWS, {
    fetchPolicy: "cache-and-network",
  });
  const [deleteMutation, _] = useMutation(mutations.DELETE_REVIEW);

  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "delete",
          onPress: async () => {
            await deleteMutation({
              variables: { deleteReviewId: reviewId },
            });
            refetch();
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={data?.me?.reviews?.edges || []}
      renderItem={({ item }) => (
        <Review
          review={item.node}
          handleDeleteReview={handleDeleteReview}
          mode="user"
        />
      )}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  );
};

export default UserReviews;
