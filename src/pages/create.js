import { Autocomplete, CircularProgress, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";
import PRE_COMMIT_MANAGER_ABI from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";
import { PRE_COMMIT_MANAGER_ADDRESS, USDC_DUMMY, ACTION_ID, COUNTRY_LIST } from "src/constants";
import { WorldIDWidget } from "@worldcoin/id";
// import { defaultAbiCoder as abi } from "@ethersproject/abi";

const CreateProject = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [worldIDProof, setWorldIDProof] = useState(null);
  // console.log({ worldIDProof });
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);

  const { config, error } = usePrepareContractWrite({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS,
    contractInterface: PRE_COMMIT_MANAGER_ABI,
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
  const { isSuccess, write } = useContractWrite(config);

  useContractEvent({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS,
    contractInterface: PRE_COMMIT_MANAGER_ABI,
    eventName: "ProjectCreated",
    listener: (event) => {
      if (event[2].toLowerCase() == address.toLowerCase()) {
        const locationName = location?.label;
        fetch("https://backend-modular-microloans.herokuapp.com/pinProject", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            projectId: event[0].toNumber(),
            json: { projectName, locationName, description },
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
              sx={{ width: 300, paddingBottom:3}}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={COUNTRY_LIST}
              sx={{ width: 300, paddingBottom:3}}
              renderInput={(params) => <TextField {...params} label="Location" />}
              value={location}
              onChange={(event, newLocation) => {
                console.log(newLocation)
                setLocation(newLocation);
              }}
              inputValue={locationInput}
              onInputChange={(event, newLocationInput) => {
                setLocationInput(newLocationInput);
              }}
            />
            <TextField
              id="accepted-asset-id"
              label="Description"
              placeholder="Share your idea with the world"
              value={description}
              sx={{ width: 300}}
              onChange={(e) => setDescription(e.target.value)}
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
                setLoading(true);
                write?.();
              }}
            >
              Launch your project 🚀
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
