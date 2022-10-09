import {
  Button,
  Card,
  CardActions,
  Grid,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import ENSResolver from "src/components/ens";
import { getProjectMetadata } from "src/utils/projectUtils";

const ProjectCard = ({ project }) => {
  const { address } = useAccount();
  const router = useRouter();
  const { chain } = useNetwork();

  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const setProjectData = (projectName, locationName, description) => {
    setProjectName(projectName);
    setLocation(locationName);
    setDescription(description);
  };

  useEffect(() => {
    setProjectName("");
    setLocation("");
    setDescription("");
    try {
      getProjectMetadata(project.id, chain ? chain.id : 80001, setProjectData);
    } catch (err) {
      console.log(err);
    }
  }, [project]);

  return (
    <Grid item sx={{ maxWidth: "33%", width: "33%" }}>
      <Card raised={true}>
        <CardHeader
          title={projectName ? projectName : "Project " + project.id}
          subheader={description ? description : ""}
          onClick={() => router.push("/project/" + project.id)}
          sx={{ cursor: "pointer" }}
        />
        <CardContent
          onClick={() => router.push("/project/" + project.id)}
          sx={{ cursor: "pointer" }}
          style={{ "margin-top": -20 }}
        >
          <Typography variant="h6" color="text.secondary">
            {project.numCommits + " active commits"}
          </Typography>
          {location ? (
            <div>
              <br />
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </div>
          ) : (
            <></>
          )}
        </CardContent>
        <CardActions>
          <div>
            <ENSResolver address_={project.receiver} />
          </div>
          {address &&
            project.receiver &&
            address.toLowerCase() == project.receiver.toLowerCase() && (
              <Button
                size="small"
                onClick={() => router.push("/redeem/" + project.id)}
                style={{ "margin-left": "auto" }}
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
