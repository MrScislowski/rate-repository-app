import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "./RepositoryList";

const numberFormatter = (n) => {
  return n > 1000 ? `${Math.round(n / 100) / 10}k` : n.toString();
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(
        <RepositoryListContainer
          repositories={repositories.edges.map((edge) => edge.node)}
        />
      );

      const listOfRepos = screen.getAllByTestId("repositoryItem");
      for (let i = 0; i < listOfRepos.length; i++) {
        const renderedRepo = listOfRepos[i];
        const repoData = repositories.edges[i].node;

        // name, description, language

        expect(within(renderedRepo).getByText(repoData.fullName)).toBeDefined();
        expect(
          within(renderedRepo).getByText(repoData.description)
        ).toBeDefined();
        expect(within(renderedRepo).getByText(repoData.language)).toBeDefined();

        // forks count, stargazers count, rating average, review count
        expect(within(renderedRepo).getByText("Forks")).toBeDefined();
        expect(
          within(renderedRepo).getByText(numberFormatter(repoData.forksCount))
        ).toBeDefined();

        expect(within(renderedRepo).getByText("Stars")).toBeDefined();
        expect(
          within(renderedRepo).getByText(
            numberFormatter(repoData.stargazersCount)
          )
        ).toBeDefined();

        expect(within(renderedRepo).getByText("Rating")).toBeDefined();
        expect(
          within(renderedRepo).getByText(
            numberFormatter(repoData.ratingAverage)
          )
        ).toBeDefined();

        expect(within(renderedRepo).getByText("Reviews")).toBeDefined();
        expect(
          within(renderedRepo).getByText(numberFormatter(repoData.reviewCount))
        ).toBeDefined();
      }
    });
  });
});
