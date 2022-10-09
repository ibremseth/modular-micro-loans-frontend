import { CircularProgress, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";
import { PRE_COMMIT_MANAGER_ADDRESS, USDC_DUMMY, ACTION_ID } from "src/constants";
import { WorldIDWidget } from "@worldcoin/id";
// import { defaultAbiCoder as abi } from "@ethersproject/abi";

const CreateProject = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const { address, isConnected } = useAccount();
  const [worldIDProof, setWorldIDProof] = useState(null);
  // console.log({ worldIDProof });

  const { config, error } = usePrepareContractWrite({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS,
    contractInterface: PRE_COMMIT_MANAGER,
    functionName: "createProject",
    args: [
      USDC_DUMMY,
      // worldIDProof?.merkle_root,
      // worldIDProof?.nullifier_hash,
      // !!worldIDProof ? abi.decode(["uint256[8]"], worldIDProof?.proof)[0] : [],
    ],
    // overrides: {
    //   gasLimit: 10000000,
    // },
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
            <div>
              {address && (
                <>
                  <WorldIDWidget
                    signal={address}
                    actionId={ACTION_ID}
                    onSuccess={(proof) => setWorldIDProof(proof)}
                    debug
                  />
                </>
              )}
            </div>
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
