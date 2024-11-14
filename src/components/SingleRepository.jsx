import { useParams } from "react-router-native";
import RepositoryItemSummary from "./RepositoryItemSummary";
import { useQuery } from "@apollo/client";
import queries from "../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const Review = ({ review }) => {
  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View>
        <Text
          style={{
            borderColor: theme.submitColor,
            textAlign: "center",
            color: theme.submitColor,
            fontWeight: "bold",
            height: 40,
            width: 40,
            padding: 5,
            borderWidth: 3,
            borderRadius: 20,
          }}
        >
          {review.rating}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          flexShrink: 1,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{review.user.username}</Text>
        <Text style={{ color: theme.secondaryFontColor }}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

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
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  return (
    <FlatList
      data={reviewQuery?.data?.repository?.reviews?.edges || []}
      renderItem={({ item }) => <Review review={item.node} />}
      ListHeaderComponent={<RepositoryItemSummary />}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  );
};

export default SingleRepository;
