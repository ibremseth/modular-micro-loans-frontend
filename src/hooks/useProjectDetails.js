import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_PROJECT = gql`
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      id
      receiver
      asset
      numCommits
      amountCommitted
      numRedeemed
      amountRedeemed
      createdAt
      commits(where: { status: ACTIVE }) {
        id
      }
    }
  }
`;

export function useProjectDetails(projectId) {
  const router = useRouter();

  const { loading, data } = useQuery(GET_PROJECT, {
    variables: {
      projectId: projectId,
    },
    skip: !router.isReady,
  });

  return { projectDetails: data?.project, projectDetailsLoading: loading };
}
