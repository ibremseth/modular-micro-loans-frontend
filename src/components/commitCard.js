import { Card, Grid, CardHeader, CardContent } from "@mui/material";
import moment from "moment";
import { ethers } from "ethers";

const formatDate = (seconds) => {
  return moment.unix(seconds).format("MMM Do YYYY");
};

const ProjectCard = ({ commit }) => {
  return (
    <Grid item sx={{ maxWidth: "25%", width: "25%" }}>
      <Card raised={true}>
        <CardHeader
          title={`${commit.committer.slice(0, 4)}...${commit.committer.slice(
            commit.committer.length - 4
          )}`}
          subheader={"Submitted on " + formatDate(commit.createdAt)}
        />
        <CardContent>
          <h4>${ethers.utils.formatUnits(commit.amount)}</h4>
          <h5>Expires on {formatDate(commit.expiry)}</h5>
        </CardContent>
        {/* <CardActions>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => router.push("/project/" + project.id)}
            >
              <AddIcon />
            </Fab>
          </CardActions> */}
      </Card>
    </Grid>
  );
};

export default ProjectCard;
