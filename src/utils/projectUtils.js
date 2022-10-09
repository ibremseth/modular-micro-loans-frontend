export const getProjectMetadata = async (projectId, successCallback) => {
  fetch(
    "https://backend-modular-microloans.herokuapp.com/pinProject?projectId=" +
      projectId
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.data[0]?.cid) {
        fetch(
          "https://" +
            data.data[0]?.cid +
            ".ipfs.w3s.link/project-" +
            projectId +
            ".json"
        )
          .then((response) => response.json())
          .then((data) => {
            successCallback(data.projectName);
          });
      }
    });
};