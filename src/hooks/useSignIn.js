import { useApolloClient, useMutation } from "@apollo/client";
import mutations from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(mutations.AUTHENTICATE_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const theResult = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(theResult.data.authenticate.accessToken);

    await apolloClient.resetStore();

    return theResult;
  };

  return [signIn, result];
};

export default useSignIn;
