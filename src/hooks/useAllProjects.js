import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { useNetwork } from "wagmi";

const GET_ALL_PROJECTS = gql`
  query GetProjects {
    projects {
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
  const { chain } = useNetwork();
  console.log(chain);

  const { loading, data, refetch } = useQuery(GET_ALL_PROJECTS, {
    context: { chainId: chain?.id },
  });

  useEffect(() => {
    refetch();
  }, [chain]);

  return { allProjects: data?.projects || [], allProjectsLoading: loading };
}
