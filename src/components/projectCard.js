import {
  Fab,
  Button,
  Card,
  CardActions,
  Grid,
  CardHeader,
  CardContent,
  Typography,
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
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const setProjectData = (projectName, locationName, description) => {
    setProjectName(projectName);
    setLocation(locationName);
    setDescription(description);
  }

  useEffect(() => {
    try {
      getProjectMetadata(project.id, setProjectData);
    } catch (err) {
      console.log(err);
    }
  }, [project]);
  const locationView = location ? (<p>{"Location: " + location}</p>) : (<></>);

  return (
    <Grid item sx={{ maxWidth: "25%", width: "25%" }}>
      <Card raised={true}>
        <CardHeader
          title={projectName ? projectName : "Project " + project.id}
          subheader={project.numCommits + " active commits"}
          onClick={() => router.push("/project/" + project.id)}
          sx={{ cursor: "pointer" }}
        />
        <CardContent>
          {description ? (<Typography variant="body1" color="text.secondary">
            {description}
          </Typography>) : (<></>)}
          {location ? (<Typography variant="body1" color="text.secondary">
            {location}
          </Typography>) : (<></>)}
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
