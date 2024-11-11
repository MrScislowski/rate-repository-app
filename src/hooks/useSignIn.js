import { useMutation } from "@apollo/client";
import mutations from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(mutations.AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const theResult = await mutate({
      variables: { credentials: { username, password } },
    });
    return theResult;
  };

  return [signIn, result];
};

export default useSignIn;
