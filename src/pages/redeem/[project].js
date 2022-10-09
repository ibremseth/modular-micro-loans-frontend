import { CircularProgress, Button, Grid } from "@mui/material";
import { useProjectDetails } from "src/hooks/useProjectDetails";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
} from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";
import { PRE_COMMIT_MANAGER_ADDRESS } from "src/constants";
import { ethers } from "ethers";
import CommitCard from "src/components/commitCard";
import { getProjectMetadata } from "src/utils/projectUtils";
import { useEffect, useState } from "react";

const RedeemPage = () => {
  const router = useRouter();
  const { project } = router.query;

  const [productName, setProductName] = useState();
  const { address, isConnected } = useAccount();
  const { projectDetails } = useProjectDetails(project);
  const { chain } = useNetwork();

  const { config } = usePrepareContractWrite({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS[chain ? chain.id : 5001],
    contractInterface: PRE_COMMIT_MANAGER,
    functionName: "redeem",
    args: [project, (projectDetails?.commits || []).map(({ id }) => id)],
  });
  const { isLoading, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    getProjectMetadata(projectDetails?.id, setProductName);
  }, [projectDetails]);

  return (
    <div>
      {isConnected &&
      address &&
      projectDetails?.receiver &&
      address.toLowerCase() == projectDetails.receiver.toLowerCase() ? (
        <div>
          <br />
          {!isLoading && !isSuccess && (
            <div>
              <Grid container direction="column" spacing={2} align="center">
                <Grid item>
                  <h4>
                    {productName
                      ? productName
                      : "Product " + projectDetails?.id}
                  </h4>
                  <p>Total Number of commits : {projectDetails?.numCommits}</p>
                  <p>
                    Total Amount :{" "}
                    {projectDetails?.amountCommitted
                      ? ethers.utils.formatUnits(
                          projectDetails?.amountCommitted
                        )
                      : 0}
                  </p>
                </Grid>
                <Grid item>
                  <Button
                    disabled={
                      !isConnected ||
                      projectDetails?.commits?.length == 0 ||
                      !write
                    }
                    onClick={() => {
                      write?.();
                    }}
                  >
                    Redeem all active commits
                  </Button>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid container spacing={2}>
                {(projectDetails?.commits || []).map((commit) => {
                  return <CommitCard commit={commit}></CommitCard>;
                })}
              </Grid>
            </div>
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
