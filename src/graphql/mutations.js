import { gql } from "@apollo/client";

const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export default { AUTHENTICATE_USER };
