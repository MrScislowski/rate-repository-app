import { Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useApolloClient, useMutation } from "@apollo/client";
import mutations from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

// const usernames = ["user2", "user3", "user4", "user5", "user6"];
const usernames = ["user7", "user8", "user9", "user10", "user11"];

const reviewTexts = [
  "I'm user 7. Penatibus fames elit sed inceptos adipiscing dui faucibus sociosqu. Vestibulum elit iaculis et sociosqu cursus. Eleifend eros ante nunc tellus leo natoque donec congue. Lacinia varius cras finibus dui dignissim hendrerit lacinia hendrerit. Curabitur enim egestas semper lorem scelerisque mattis hac habitant. Aenean ex nam; lobortis id ultricies tristique? Penatibus ultrices dapibus eros mus laoreet mi?",
  "I'm user 8. Tempor imperdiet ullamcorper condimentum natoque metus sagittis. Mattis varius feugiat orci laoreet ante; sem fames. Ullamcorper fames gravida laoreet placerat consectetur sem curae. Venenatis vestibulum eu facilisi tellus eleifend elementum eleifend. Maximus nibh curabitur quisque est tempor. Arcu at ex curabitur class; sed dignissim cras leo. Semper at parturient arcu felis tellus erat.",
  "I'm user 9. Tempor nunc lacus arcu blandit odio porta libero lectus pretium. Est tortor habitasse semper etiam nullam. Cursus aptent suspendisse magnis senectus orci purus velit. Ac proin nibh pulvinar fusce lorem congue risus aenean. Lacus blandit dis pellentesque bibendum dictum fusce platea primis malesuada. Vel curabitur pharetra penatibus convallis etiam libero. Auctor netus massa elit; integer justo fringilla. Lacus scelerisque arcu curae velit iaculis curabitur. Lacinia lectus viverra pulvinar sociosqu mollis massa elit sapien.",
  "I'm user 10. Nulla torquent justo pulvinar tristique duis fusce. Erat eros nam faucibus mattis vestibulum parturient sed. Nisl odio ligula donec ex mattis leo. Habitasse elementum sollicitudin dis, dignissim amet netus. Urna varius volutpat ligula velit condimentum in, nostra lacus. Odio pulvinar class eros diam placerat pellentesque. Porta convallis ultricies laoreet fusce porta. Suspendisse suspendisse sodales eleifend et ullamcorper vestibulum mus.",
  "I'm user 11. Non suspendisse netus condimentum consequat dictum blandit. Nascetur enim lorem fusce scelerisque nunc dapibus; habitant elementum. Ligula venenatis quam venenatis finibus felis sit mus ultricies. Velit vivamus litora nibh cursus dapibus. Fusce mauris tortor pulvinar per commodo torquent semper convallis taciti? Ad primis pharetra donec, diam laoreet dictum. Turpis convallis sed pharetra ligula facilisis torquent aliquet. Dictum luctus est blandit mus penatibus; primis bibendum. Mus natoque nostra efficitur efficitur aenean justo inceptos magna.",
];
const reviewTemplate = {
  ownerName: "zeit",
  repositoryName: "swr",
};

const Seeder = () => {
  const [createUser] = useMutation(mutations.CREATE_USER);
  const [signIn] = useSignIn();
  const [createReview] = useMutation(mutations.CREATE_REVIEW);

  const handleSeed = async () => {
    for (let i = 0; i < usernames.length; i++) {
      try {
        const createdUser = await createUser({
          variables: {
            user: { username: usernames[i], password: "password" },
          },
        });
        console.log("created user");
        console.log(createdUser);
      } catch (err) {
        console.log(err);
      }
      try {
        const signInResult = await signIn({
          username: usernames[i],
          password: "password",
        });
        console.log("signed in");
        console.log(signInResult);
      } catch (err) {
        console.log(err);
      }
      try {
        const createdReview = await createReview({
          variables: {
            review: {
              ...reviewTemplate,
              rating: Math.floor(Math.random() * 100),
              text: reviewTexts[i],
            },
          },
        });
        console.log("created review");
        console.log(createdReview);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Pressable onPress={handleSeed} style={theme.button}>
      <Text style={theme.buttonText}>Seed users and reviews</Text>
    </Pressable>
  );
};

export default Seeder;
