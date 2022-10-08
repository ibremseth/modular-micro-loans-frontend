import { CircularProgress, Button, Grid } from "@mui/material";
import { useProjectDetails } from "src/hooks/useProjectDetails";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";

const RedeemPage = () => {
  const router = useRouter();
  const { project } = router.query;

  const { address, isConnected } = useAccount();
  const {
    projectDetails: { receiver, numCommits, amountCommitted, commits },
  } = useProjectDetails(project);

  const { config } = usePrepareContractWrite({
    addressOrName: "0x9eaddf39133b59642a56f03aa3069806e021802f",
    contractInterface: PRE_COMMIT_MANAGER,
    functionName: "redeem",
    args: [project, commits.map(({ id }) => id)],
  });
  const { isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      {isConnected &&
      address &&
      receiver &&
      address.toLowerCase() == receiver.toLowerCase() ? (
        <div>
          <br />
          {!isLoading && !isSuccess && (
            <Grid container direction="column" spacing={2} align="center">
              <Grid item>
                <p>Project Info</p>
                <p>Total Number of commits : {numCommits}</p>
                <p>Total Amoutn of commits : {amountCommitted}</p>
              </Grid>
              <Grid item>
                <Button
                  disabled={!isConnected || !write}
                  onClick={() => {
                    write?.();
                  }}
                >
                  Redeem commits
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
      ) : (
        <div>
          <p>Must be owner of project to redeem</p>
        </div>
      )}
    </div>
  );
};

export default RedeemPage;
