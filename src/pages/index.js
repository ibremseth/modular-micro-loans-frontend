import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ProjectCard from "src/components/projectCard";
import { useAllProjects } from "src/hooks/useAllProjects";

const DiscoverPage = () => {
  const router = useRouter();

  const { allProjects } = useAllProjects();

  return (
    <div>
      <Button onClick={() => router.push("/create")}>
        Or create your own...
      </Button>
      <Grid container spacing={1}>
        {(allProjects || []).map((project) => {
          return <ProjectCard project={project}></ProjectCard>;
        })}
      </Grid>
    </div>
  );
};

export default DiscoverPage;
