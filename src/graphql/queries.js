import { gql } from "@apollo/client";

const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
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

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      username
    }
  }
`;

const GET_REPOSITORY_BY_ID = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
    }
  }
`;

export default { GET_REPOSITORIES, GET_CURRENT_USER, GET_REPOSITORY_BY_ID };
