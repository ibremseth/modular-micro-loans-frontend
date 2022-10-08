import {
  InputAdornment,
  CircularProgress,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import PRE_COMMIT_MANAGER from "src/abis/PreCommitManager.json";
import ERC20 from "src/abis/ERC20.json";
import { useRouter } from "next/router";
import moment from "moment";
import { ethers } from "ethers";
import { PRE_COMMIT_MANAGER_ADDRESS, USDC_DUMMY } from "src/constants";

const CommitPage = () => {
  const router = useRouter();
  const { project } = router.query;

  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState(moment());

  const { isConnected } = useAccount();

  const { config: allowanceConfig } = usePrepareContractWrite({
    addressOrName: USDC_DUMMY,
    contractInterface: ERC20,
    functionName: "approve",
    args: [
      PRE_COMMIT_MANAGER_ADDRESS,
      amount ? ethers.utils.parseUnits(amount, 18) : 0,
    ],
  });
  const {
    isLoading: allowanceIsLoading,
    isSuccess: allowanceIsSuccess,
    write: allowanceWrite,
  } = useContractWrite(allowanceConfig);

  const { config } = usePrepareContractWrite({
    addressOrName: PRE_COMMIT_MANAGER_ADDRESS,
    contractInterface: PRE_COMMIT_MANAGER,
    functionName: "commit",
    args: [
      project,
      amount ? ethers.utils.parseUnits(amount, 18) : 0,
      deadline.unix(),
    ],
  });
  const { isLoading, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    if (allowanceIsSuccess && write) {
      write();
    }
  }, [allowanceIsSuccess, write]);

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
              disabled={!isConnected || !amount || !deadline || !allowanceWrite}
              onClick={() => {
                allowanceWrite?.();
              }}
            >
              Submit to contract
            </Button>
          </Grid>
        </Grid>
      )}
      {(isLoading || allowanceIsLoading) && (
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
