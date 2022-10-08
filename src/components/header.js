import { AppBar, Grid, Toolbar } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

const AquaHeader = () => {
  const router = useRouter();
  return (
    <div>
      <AppBar position="sticky">
        <Grid container>
          <Grid item>
            <Toolbar
              onClick={() => router.push("/")}
              sx={{ cursor: "pointer" }}
              style={{ height: "100%" }}
            >
              Agua Sin Gas
            </Toolbar>
          </Grid>
          {/* <Grid item>
            <Toolbar
              onClick={() => router.push("/")}
              sx={{ cursor: "pointer" }}
              style={{ height: "100%" }}
            >
              My Projects
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar
              onClick={() => router.push("/")}
              sx={{ cursor: "pointer" }}
              style={{ height: "100%" }}
            >
              My Commits
            </Toolbar>
          </Grid> */}
          <Grid item xs>
            <Grid container direction="row-reverse" style={{ padding: "2%" }}>
              <ConnectButton />
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default AquaHeader;
