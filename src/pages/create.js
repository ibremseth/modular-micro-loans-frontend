import { CircularProgress, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";
import PRE_COMMIT_MANAGER_ABI from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";
import { PRE_COMMIT_MANAGER_ADDRESS, USDC_DUMMY } from "src/constants";

const CreateProject = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);

  const { config } = usePrepareContractWrite({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS,
    contractInterface: PRE_COMMIT_MANAGER_ABI,
    functionName: "createProject",
    args: [USDC_DUMMY],
  });
  const { isSuccess, write } = useContractWrite(config);

  useContractEvent({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS,
    contractInterface: PRE_COMMIT_MANAGER_ABI,
    eventName: "ProjectCreated",
    listener: (event) => {
      if (event[2].toLowerCase() == address.toLowerCase()) {
        fetch("https://backend-modular-microloans.herokuapp.com/pinProject", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            projectId: event[0].toNumber(),
            json: { projectName },
          }),
        }).then(() => {
          setLoading(false);
        });
      }
    },
  });

  return (
    <div>
      <br />
      {!loading && !isSuccess && (
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
                setLoading(true);
                write?.();
              }}
            >
              Submit to contract
            </Button>
          </Grid>
        </Grid>
      )}
      {loading && (
        <Grid container direction="column" align="center">
          <Grid item>
            <CircularProgress />
          </Grid>
          <Grid item>
            <p>Creating your project...</p>
          </Grid>
        </Grid>
      )}
      {isSuccess && !loading && (
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
