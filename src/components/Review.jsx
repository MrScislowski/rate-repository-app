import { View, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const ReviewButtons = ({ reviewId, repositoryId }) => {
  const navigate = useNavigate();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Pressable
        style={{ flexGrow: 1 }}
        onPress={() => {
          navigate(`/repositories/${repositoryId}`);
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: theme.submitColor,
            padding: 10,
            margin: 10,
            borderRadius: 5,
          }}
        >
          View Repository
        </Text>
      </Pressable>
      <Pressable style={{ flexGrow: 1 }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "red",
            padding: 10,
            margin: 10,
            borderRadius: 5,
          }}
        >
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};

const Review = ({ review, mode }) => {
  return (
    <>
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
            {mode === "user"
              ? review.repository.fullName
              : review.user.username}
          </Text>
          <Text style={{ color: theme.secondaryFontColor }}>
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {mode === "user" ? (
        <ReviewButtons repositoryId={review.repositoryId} />
      ) : null}
    </>
  );
};

export default Review;
