import {
  Fab,
  Button,
  Card,
  CardActions,
  Grid,
  CardHeader,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ENSResolver from "./ens";
import { getProjectMetadata } from "src/utils/projectUtils";

const ProjectCard = ({ project }) => {
  const { address } = useAccount();
  const router = useRouter();

  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    try {
      getProjectMetadata(project.id, setProjectName);
    } catch (err) {
      console.log(err);
    }
  }, [project]);

  return (
    <Grid item sx={{ maxWidth: "25%", width: "25%" }}>
      <Card raised={true}>
        <CardHeader
          title={projectName ? projectName : "Project " + project.id}
          subheader={project.numCommits + " active commits"}
          onClick={() => router.push("/project/" + project.id)}
          sx={{ cursor: "pointer" }}
        />
        <CardContent
          onClick={() => router.push("/project/" + project.id)}
          sx={{ cursor: "pointer" }}
        >
          <ENSResolver address_={project.receiver} />
        </CardContent>
        <CardActions>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => router.push("/project/" + project.id)}
          >
            <AddIcon />
          </Fab>
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
