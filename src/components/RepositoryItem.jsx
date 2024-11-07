import { Text, View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerBar: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titleText: {
    fontWeight: "bold",
  },
  descriptionText: {},
  languageText: {
    backgroundColor: "#005eff",
    color: "#ffffff",
    marginLeft: 70,
  },
});

const RepositoryItem = (props) => {
  const item = props.item;
  console.log(item.ownerAvatarUrl);
  return (
    <View>
      <View style={styles.headerBar}>
        <Image
          height={50}
          width={50}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
        <Text style={styles.titleText}>{item.fullName} </Text>
        <Text style={styles.descriptionText}>{item.description} </Text>
      </View>
      <Text style={styles.languageText}>{item.language} </Text>
      <Text>Stars: {item.stargazersCount} </Text>
      <Text>Forks: {item.forksCount} </Text>
      <Text>Reviews: {item.reviewCount} </Text>
      <Text>Rating: {item.ratingAverage} </Text>
    </View>
  );
};

export default RepositoryItem;
