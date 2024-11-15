import { View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const Review = ({ review, mode }) => {
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
        <Text style={{ fontWeight: "bold" }}>
          {mode === "user" ? review.repository.fullName : review.user.username}
        </Text>
        <Text style={{ color: theme.secondaryFontColor }}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default Review;
