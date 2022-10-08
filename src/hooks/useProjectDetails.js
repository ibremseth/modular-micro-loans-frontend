import { useQuery, gql } from "@apollo/client";

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      receiver
      asset
      numCommits
      amountCommitted
      numRedeemed
      amountRedeemed
      createdAt
      commits {
        id
      }
    }
  }
`;

export function useProjectDetails(projectId) {
  const projectDetails = {
    id: projectId,
    receiver: "0xBf33d3f2c623550c48D7063E0Ac233c8De2dB414",
    asset: "",
    numCommits: 10,
    amountCommitted: 100,
    numRedeemed: 0,
    amountRedeemed: 0,
    createdAt: 0,
    commits: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  };
  return { projectDetails, projectDetailsLoading: false };

  const { loading, data } = useQuery(GET_PROJECT, {
    variables: {
      id: projectId,
    },
  });
  return { projectDetails: data, projectDetailsLoading: loading };
}
