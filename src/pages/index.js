import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ProjectCard from "../components/projectCard";
import { useAllProjects } from "../hooks/useAllProjects";

const DiscoverPage = () => {
  const router = useRouter();

  const { allProjects } = useAllProjects();

  return (
    <div>
      <Button onClick={() => router.push("/create")}>Create your own...</Button>
      <Grid container spacing={1}>
        {allProjects.map((project) => {
          return <ProjectCard project={project}></ProjectCard>;
        })}
      </Grid>
    </div>
  );
};

export default DiscoverPage;
