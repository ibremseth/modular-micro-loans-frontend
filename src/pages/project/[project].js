import {
  InputAdornment,
  CircularProgress,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";
import { useRouter } from "next/router";
import moment from "moment";
import { ethers } from "ethers";

const CommitPage = () => {
  const router = useRouter();
  const { project } = router.query;

  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState(moment());

  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: "0x9eaddf39133b59642a56f03aa3069806e021802f",
    contractInterface: PRE_COMMIT_MANAGER,
    functionName: "commit",
    args: [
      project,
      amount ? ethers.utils.parseUnits(amount, 18) : 0,
      deadline.unix(),
    ],
  });
  const { isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <br />
      {!isLoading && !isSuccess && (
        <Grid container direction="column" spacing={2} align="center">
          <Grid item>
            <TextField
              id="outlined-number"
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Commit Deadline"
                value={deadline}
                onChange={(newValue) => {
                  setDeadline(newValue);
                }}
                minDate={moment()}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Button
              disabled={!isConnected || !amount || !deadline || !write}
              onClick={() => {
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

export default CommitPage;
