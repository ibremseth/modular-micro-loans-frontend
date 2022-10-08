import { useQuery, gql } from "@apollo/client";

const GET_ALL_PROJECTS = gql`
  query GetProjects {
    project {
      id
      receiver
      asset
      numCommits
      amountCommitted
      numRedeemed
      amountRedeemed
      createdAt
    }
  }
`;

export function useAllProjects() {
  return {
    allProjects: [
      {
        id: 1,
        receiver: "",
        numCommits: 10,
        amountCommitted: 1000,
        numRedeemed: 2,
        amountRedeemed: 250,
      },
      {
        id: 2,
        receiver: "0xBf33d3f2c623550c48D7063E0Ac233c8De2dB414",
        numCommits: 10,
        amountCommitted: 1000,
        numRedeemed: 2,
        amountRedeemed: 250,
      },
      {
        id: 69,
        receiver: "",
        numCommits: 10,
        amountCommitted: 1000,
        numRedeemed: 2,
        amountRedeemed: 250,
      },
    ],
    allProjectsLoading: false,
  };

  const { loading, data } = useQuery(GET_ALL_PROJECTS);
  return { allProjects: data, allProjectsLoading: loading };
}
