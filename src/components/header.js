import { AppBar, Grid, Toolbar } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

const AquaHeader = () => {
  const router = useRouter();
  return (
    <div>
      <AppBar>
        <Grid container>
          <Grid item>
            <Toolbar onClick={() => router.push("/")}>Home</Toolbar>
          </Grid>
          <Grid item xs>
            <Grid container direction="row-reverse">
              <ConnectButton />
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AquaHeader;
