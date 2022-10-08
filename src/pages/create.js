import { TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";

const usdc = "0xe6b8a5cf854791412c1f6efc7caf629f5df1c747";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const { address, isConnected } = useAccount();

  const { config, error } = usePrepareContractWrite({
    addressOrName: "0x9eaddf39133b59642a56f03aa3069806e021802f",
    contractInterface: PRE_COMMIT_MANAGER,
    functionName: "createProject",
    args: [usdc],
  });
  const { isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <br />
      {!isLoading && !isSuccess && (
        <Grid container direction="column" spacing={2} align="center">
          <Grid item>
            <TextField
              id="accepted-asset-id"
              label="Project Name"
              placeholder="Your project here..."
              value={projectName}
              onChange={setProjectName}
            />
          </Grid>
          <Grid item>
            <Button disabled={!isConnected || !write} onClick={() => write?.()}>
              Submit to contract
            </Button>
          </Grid>
        </Grid>
      )}
      {isLoading && (
        <div>
          <p>loading ... </p>
        </div>
      )}
      {isSuccess && (
        <div>
          <p>Success!!!</p>
        </div>
      )}
    </div>
  );
};

export default CreateProject;
