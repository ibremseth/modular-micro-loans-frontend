import { Grid } from "@mui/material";
import ProjectCard from "../components/projectCard";

const DiscoverPage = () => {
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
      <Grid container spacing={1}>
        {projects.map((project) => {
          return <ProjectCard project={project}></ProjectCard>;
        })}
      </Grid>
    </div>
  );
};

export default DiscoverPage;
