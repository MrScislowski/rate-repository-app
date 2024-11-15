import { gql } from "@apollo/client";

const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export default { AUTHENTICATE_USER, CREATE_REVIEW, CREATE_USER };
