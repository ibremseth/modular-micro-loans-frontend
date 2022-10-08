import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Web3Storage } from "web3.storage";

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
        <CardContent>
          <p>{"Project: " + projectName}</p>
          <p>{"Project ID: " + project.id}</p>
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