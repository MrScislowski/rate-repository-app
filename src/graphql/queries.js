import { gql } from "@apollo/client";

const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export default { GET_REPOSITORIES };
