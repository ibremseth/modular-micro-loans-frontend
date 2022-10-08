import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const ProjectCard = ({ project }) => {
  const { address } = useAccount();
  const router = useRouter();

  return (
    <Grid item sx={3}>
      <Card raised={true}>
        <CardContent>
          <p>{"Project ID: " + project.id}</p>
          <p>{"Number Committed: " + project.numCommits}</p>
          <p>{"Amount Committed: " + project.amountCommitted}</p>
          <p>{"Number Redeemed: " + project.numRedeemed}</p>
          <p>{"Amount Redeemed: " + project.amountRedeemed}</p>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => router.push("/project/" + project.id)}
          >
            Commit
          </Button>
          {address &&
            project.receiver &&
            address.toLowerCase() == project.receiver.toLowerCase() && (
              <Button
                size="small"
                onClick={() => router.push("/redeem/" + project.id)}
              >
                Redeem
              </Button>
            )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
