import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
  },
  text: { fontWeight: "bold", color: "white", fontSize: 18 },
});

const AppBarTab = ({ children }) => {
  return (
    <View style={styles.container}>
      <>
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && child.type === Text
            ? React.cloneElement(child, { style: styles.text }) // Add styles.text to Text elements
            : child
        )}
      </>
    </View>
  );
};

export default AppBarTab;
