import {
  Fab,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  CardHeader,
  Avatar,
} from "@mui/material";
import { red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ENSResolver from "./ens";

const ProjectCard = ({ project }) => {
  const { address } = useAccount();
  const router = useRouter();

  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    try {
      fetch(
        "https://backend-modular-microloans.herokuapp.com/pinProject?projectId=" +
          project.id
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data[0]?.cid) {
            fetch(
              "https://" +
                data.data[0]?.cid +
                ".ipfs.w3s.link/project-" +
                project.id +
                ".json"
            )
              .then((response) => response.json())
              .then((data) => {
                setProjectName(data.projectName);
              });
          }
        });
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
        <CardContent>
          <p>{"Project: " + projectName}</p>
          <p>{"Project ID: " + project.id}</p>
          <p>{"Commits: " + project.numCommits}</p>
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
