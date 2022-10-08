export function useProjectDetails(projectId) {
  // TODO: Add call to get project details from graph
  const projectDetails = {
    id: projectId,
    receiver: "0xBf33d3f2c623550c48D7063E0Ac233c8De2dB414",
    asset: "",
    numCommits: 10,
    amountCommitted: 100,
    numRedeemed: 0,
    amountRedeemed: 0,
    createdAt: 0,
    commitIds: [1, 2, 3, 4],
  };
  return { projectDetails, projectDetailsLoading: false };
}
