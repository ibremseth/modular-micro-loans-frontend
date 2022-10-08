import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ProjectCard from "../components/projectCard";

const DiscoverPage = () => {
  const router = useRouter();

  // Get list of projects
  const projects = [
    {
      id: 1,
      numCommits: 10,
      amountCommitted: 1000,
      numRedeemed: 2,
      amountRedeemed: 250,
    },
    {
      id: 2,
      numCommits: 10,
      amountCommitted: 1000,
      numRedeemed: 2,
      amountRedeemed: 250,
    },
    {
      id: 69,
      numCommits: 10,
      amountCommitted: 1000,
      numRedeemed: 2,
      amountRedeemed: 250,
    },
  ];

  return (
    <div>
      <Button onClick={() => router.push("/create")}>Create your own...</Button>
      <Grid container spacing={1}>
        {projects.map((project) => {
          return <ProjectCard project={project}></ProjectCard>;
        })}
      </Grid>
    </div>
  );
};

export default DiscoverPage;
