import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useParams } from "react-router-native";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import queries from "../graphql/queries";

const styles = StyleSheet.create({
  headerRow: {
    display: "flex",
    flexDirection: "row",
  },
  imageContainer: {
    padding: 10,
  },
  titleColumn: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginLeft: 10,
    padding: 5,
    flex: 1,
  },
  titleText: {
    fontWeight: "bold",
    flexWrap: "wrap",
    color: theme.mainFontColor,
  },
  descriptionText: {
    flexWrap: "wrap",
    width: "100%",
    color: theme.secondaryFontColor,
  },
  languageText: {
    backgroundColor: theme.submitColor,
    color: "#ffffff",
    marginLeft: 80,
    alignSelf: "flex-start",
    borderRadius: 5,
    overflow: "hidden", // needed for ioS
    padding: 5,
  },
  statsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  singleStatColumn: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    alignItems: "center",
  },
  numberText: {
    fontWeight: "bold",
    color: theme.mainFontColor,
  },
  unitText: {
    color: theme.secondaryFontColor,
  },
  button: theme.button,
});

const numberFormatter = (n) => {
  return n > 1000 ? `${Math.round(n / 100) / 10}k` : n;
};

const RepositoryItem = (props) => {
  const [item, setItem] = useState(props?.item);
  const params = useParams();
  const [fetchRepo, fetchRepoResponse] = useLazyQuery(
    queries.GET_REPOSITORY_BY_ID,
    {
      variables: { repositoryId: params?.id },
    }
  );

  useEffect(() => {
    if (params?.id) {
      fetchRepo();
    }
  }, []);

  // Need to do a request for {"id":"async-library.react-async"}

  if (fetchRepoResponse.error) {
    return <Text>Error fetching repo</Text>;
  }

  if (fetchRepoResponse.data && !item) {
    setItem(fetchRepoResponse.data.repository);
  }

  if (fetchRepoResponse.loading || !item) {
    return <Text>Loading...</Text>;
  }

  return (
    <View testID="repositoryItem">
      <View style={styles.headerRow}>
        <View style={styles.imageContainer}>
          <Image
            width={50}
            height={50}
            borderRadius={5}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.titleColumn}>
          <Text style={styles.titleText}>{item.fullName} </Text>
          <Text style={styles.descriptionText}>{item.description} </Text>
        </View>
      </View>
      <Text style={styles.languageText}>{item.language} </Text>

      <View style={styles.statsRow}>
        <View style={styles.singleStatColumn}>
          <Text style={styles.numberText}>
            {numberFormatter(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.singleStatColumn}>
          <Text style={styles.numberText}>
            {numberFormatter(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.singleStatColumn}>
          <Text style={styles.numberText}>
            {numberFormatter(item.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.singleStatColumn}>
          <Text style={styles.numberText}>
            {numberFormatter(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
      {!item?.url || (
        <Pressable style={styles.button}>
          <Text>Go to github</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
