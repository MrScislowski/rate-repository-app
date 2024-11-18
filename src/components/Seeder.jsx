import { Alert, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useApolloClient, useMutation } from "@apollo/client";
import mutations from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

const usernames = ["user2", "user3", "user4", "user5", "user6"];

const reviewTexts = [
  "I'm user 2. Lorem ipsum odor amet, consectetuer adipiscing elit. Duis nascetur rutrum sit; litora litora tempor sed. Mus vulputate auctor; inceptos ridiculus erat nibh. Mattis maecenas ridiculus porttitor quam magnis iaculis. Semper tellus eros cursus id euismod ad vestibulum. Aenean elementum mauris conubia netus, at sollicitudin? Nam convallis varius massa himenaeos integer pulvinar. Ultricies ut vehicula enim a torquent penatibus sem integer.",
  "I'm user 3. Bibendum porttitor efficitur diam ad blandit efficitur. Metus et sem curae inceptos; at fringilla nullam dignissim donec. Elementum rutrum fermentum aptent mi quisque taciti. Eu viverra condimentum aliquet faucibus conubia litora, placerat auctor sagittis. Et porta malesuada venenatis orci odio sapien aliquam. Ipsum gravida commodo proin ultricies consectetur integer magnis dolor finibus.",
  "I'm user 4. Luctus bibendum non ridiculus congue fames phasellus est. Scelerisque facilisis diam nisi litora enim inceptos. Ante nunc auctor metus cubilia ultricies viverra? Curabitur auctor dignissim pulvinar sit fringilla justo. Eleifend inceptos blandit ante nullam viverra dolor. Ornare erat elementum iaculis risus; interdum viverra. Nisi nisl suspendisse faucibus orci ac turpis nisi dis nisl.",
  "I'm user 5. Hendrerit dui integer facilisi senectus porttitor euismod nisi inceptos. Dis porta nam consectetur eleifend eget purus? Taciti vivamus litora eros fusce vulputate habitant fusce sem. Quisque tellus commodo netus ex magna. Mattis viverra justo gravida viverra netus lectus consequat magnis. Sollicitudin facilisi imperdiet nam dapibus luctus sem. Convallis congue curae leo natoque, imperdiet nibh. Aenean ut eu finibus vehicula volutpat placerat litora potenti. Cursus sem aliquam dignissim amet litora massa nibh metus hac.",
  "I'm user 6. Dictum dis himenaeos suspendisse eleifend varius habitant. Nibh fusce penatibus primis justo consectetur lorem. Turpis eros velit pellentesque urna ullamcorper vel gravida. Elit tempus class gravida accumsan potenti? Elit metus tempus est rutrum libero, consequat sagittis ex libero. Consequat posuere semper dui mauris mollis molestie phasellus.",
];
const reviewTemplate = {
  ownerName: "zeit",
  repositoryName: "swr",
  rating: 94,
};

const Seeder = () => {
  const apolloClient = useApolloClient();
  const [createUser] = useMutation(mutations.CREATE_USER);
  const [signIn] = useSignIn();
  const [createReview] = useMutation(mutations.CREATE_REVIEW);

  const handleSeed = async () => {
    for (let i = 0; i < usernames.length; i++) {
      const createdUser = await createUser({
        variables: { user: { username: usernames[i], password: "password" } },
      });
      console.log("created user");
      console.log(createdUser);
      const signInResult = await signIn({
        username: usernames[i],
        password: "password",
      });
      console.log("signed in");
      console.log(signInResult);
      const createdReview = await createReview({
        variables: {
          review: {
            ...reviewTemplate,
            text: reviewTexts[i],
          },
        },
      });
      console.log("created review");
      console.log(createdReview);
    }
  };

  return (
    <Pressable onPress={handleSeed} style={theme.button}>
      <Text style={theme.buttonText}>Seed users and reviews</Text>
    </Pressable>
  );
};

export default Seeder;
