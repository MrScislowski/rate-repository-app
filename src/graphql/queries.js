import { gql } from "@apollo/client";

const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
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
      pageInfo {
        hasNextPage
        startCursor
        endCursor
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

const GET_USER_REVIEWS = gql`
  query GetMyReviews {
    me {
      reviews {
        edges {
          node {
            createdAt
            id
            rating
            repositoryId
            text
            user {
              username
            }
            userId
            repository {
              fullName
            }
          }
        }
      }
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

const GET_REPOSITORY_REVIEWS_BY_ID = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export default {
  GET_REPOSITORIES,
  GET_CURRENT_USER,
  GET_REPOSITORY_BY_ID,
  GET_REPOSITORY_REVIEWS_BY_ID,
  GET_USER_REVIEWS,
};
