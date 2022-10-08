import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";

const ProjectCard = ({ project }) => {
  return (
    <Grid item sx={3}>
      <Card raised={true}>
        <CardContent>
          <p>{"Project ID :" + project.id}</p>
          <p>{"Number Committed :" + project.numCommits}</p>
          <p>{"Amount Committed :" + project.amountCommitted}</p>
          <p>{"Number Redeemed :" + project.numRedeemed}</p>
          <p>{"Amount Redeemed :" + project.amountRedeemed}</p>
        </CardContent>
        <CardActions>
          <Button size="small" href={"/project/" + project.id}>
            Commit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
