import { CircularProgress, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";

const usdc = "0xe6b8a5cf854791412c1f6efc7caf629f5df1c747";

const CreateProject = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
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
