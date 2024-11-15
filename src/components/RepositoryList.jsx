import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import RepositoryItemSummary from "./RepositoryItemSummary";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDebounce } from "use-debounce";
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
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounced] = useDebounce(searchText, 500);

  const { repositories, fetchMore } = useRepositories({
    ordering,
    searchKeyword: searchTextDebounced,
  });

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      ordering={ordering}
      setOrdering={setOrdering}
      searchText={searchText}
      setSearchText={setSearchText}
      fetchMore={fetchMore}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  ordering,
  setOrdering,
  searchText,
  setSearchText,
  fetchMore,
}) => {
  const navigate = useNavigate();

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <TextInput
            style={{ backgroundColor: "lightgrey", padding: 10 }}
            placeholder="Enter Search Text"
            value={searchText}
            onChangeText={(newtext) => {
              setSearchText(newtext);
            }}
          />
          <RepositoryOrderingSelection
            ordering={ordering}
            setOrdering={setOrdering}
          />
        </>
      }
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.01}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItemSummary item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;
