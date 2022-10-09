import { Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ProjectCard from "src/components/projectCard";
import { useAllProjects } from "src/hooks/useAllProjects";

const DiscoverPage = () => {
  const router = useRouter();

  const { allProjects } = useAllProjects();

  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="body" color="text.primary">
            IMAGE
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body" color="text.primary">
            WE LOVE LATAM COUNTRIES
          </Typography>
        </Grid>
      </Grid>
      <Button onClick={() => router.push("/create")}>
        Or create your own...
      </Button>
      <Grid container spacing={2}>
        {(allProjects || []).map((project) => {
          return <ProjectCard project={project}></ProjectCard>;
        })}
      </Grid>
    </div>
  );
};

export default DiscoverPage;
