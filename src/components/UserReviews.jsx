import { StyleSheet, FlatList, View } from "react-native";
import theme from "../theme";
import Review from "./Review";
import queries from "../graphql/queries";
import { useQuery } from "@apollo/client";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backdropColor,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const reviewQuery = useQuery(queries.GET_USER_REVIEWS, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <FlatList
      data={reviewQuery?.data?.me?.reviews?.edges || []}
      renderItem={({ item }) => <Review review={item.node} mode="user" />}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  );
};

export default UserReviews;
