import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useNetwork } from "wagmi";

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
        committer
        amount
        expiry
        status
        createdAt
      }
    }
  }
`;

export function useProjectDetails(projectId) {
  const router = useRouter();
  const { chain } = useNetwork();

  const { loading, data, refetch } = useQuery(GET_PROJECT, {
    variables: {
      projectId: projectId,
    },
    skip: !router.isReady,
    context: { chainId: chain?.id },
  });

  useEffect(() => {
    refetch();
  }, [chain]);

  return { projectDetails: data?.project, projectDetailsLoading: loading };
}
