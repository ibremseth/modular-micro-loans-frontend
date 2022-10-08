import { CircularProgress, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";
import { PRE_COMMIT_MANAGER_ADDRESS, USDC_DUMMY } from "src/constants";

const CreateProject = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS,
    contractInterface: PRE_COMMIT_MANAGER,
    functionName: "createProject",
    args: [USDC_DUMMY],
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
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!isConnected || !write}
              onClick={() => {
                // TODO: Save Project metadata to IPFS
                write?.();
              }}
            >
              Submit to contract
            </Button>
          </Grid>
        </Grid>
      )}
      {isLoading && (
        <Grid container direction="column" align="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {isSuccess && (
        <Grid container direction="column" align="center">
          <Grid item>
            <p>Success!!!</p>
          </Grid>
          <Grid item>
            <Button onClick={() => router.push("/")}>Go Home</Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CreateProject;
