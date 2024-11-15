import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItemSummary from "./RepositoryItemSummary";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Dropdown } from "react-native-element-dropdown";
import Text from "./Text";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backdropColor,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryOrderingSelection = ({ ordering, setOrdering }) => {
  return (
    <View>
      <Dropdown
        style={{ backgroundColor: "lightgrey", padding: 10 }}
        labelField="label"
        valueField="value"
        placeholder="Select Item"
        data={[
          { label: "Latest", value: "Latest" },
          { label: "Highest Rated", value: "Highest Rated" },
          { label: "Lowest Rated", value: "Lowest Rated" },
        ]}
        onChange={(item) => {
          setOrdering(item.value);
        }}
        value={ordering}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [ordering, setOrdering] = useState("Latest");
  const { repositories } = useRepositories({ ordering });

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      ordering={ordering}
      setOrdering={setOrdering}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  ordering,
  setOrdering,
}) => {
  const navigate = useNavigate();

  return (
    <FlatList
      ListHeaderComponent={
        <RepositoryOrderingSelection
          ordering={ordering}
          setOrdering={setOrdering}
        />
      }
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItemSummary item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;
