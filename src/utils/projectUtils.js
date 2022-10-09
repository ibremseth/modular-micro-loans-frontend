export const getProjectMetadata = async (
  projectId,
  chainId,
  successCallback
) => {
  fetch(
    "https://backend-modular-microloans.herokuapp.com/pinProject?projectId=" +
      chainId +
      "00" +
      projectId
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.data[0]?.cid) {
        fetch(
          "https://" +
            data.data[0]?.cid +
            ".ipfs.w3s.link/project-" +
            chainId +
            "00" +
            projectId +
            ".json"
        )
          .then((response) => response.json())
          .then((data) => {
            successCallback(
              data.projectName,
              data.locationName,
              data.description
            );
          });
      }
    });
};
