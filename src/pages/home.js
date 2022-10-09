import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

const styles = {
  toolBar: {
    height: "10vh",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "white",
  },
  logo: {
    color: "blue",
    cursor: "pointer",
  },
  link: {
    color: "#000",
  },
  menuIcon: {
    color: "#000",
  },
  formContainer: {
    flexGrow: 1,
    padding: "10px",
    maxWidth: "700px",
    margin: "30px auto",
  },
  form: {
    marginTop: "30px",
  },
  formHeading: {
    textAlign: "center",
  },
  heroBox: {
    width: "100%",
    display: "flex",
    minHeight: "600px",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    display: "flex",
    alignItems: "center",
    maxWidth: "1300px",
    padding: "50px",
  },
  aboutUsContainer: {
    width: "100%",
    display: "flex",
    minHeight: "400px",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px 0px 50px 0px",
  },
  aboutUsSubtitle: {
    opacity: "0.7",
    paddingBottom: "30px",
    fontSize: "18px",
  },
  title1: {
    paddingBottom: "15px",
    textDecoration: "line-through"
  },
  title2: {
    paddingBottom: "15px"
  },
  subtitle: {
    opacity: ".8",
    paddingBottom: "30px",
  },
  largeImage: {
    width: "100%",
  },
  sectionGridContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "500px",
  },
  sectionGridItem: {
    backgroundColor: "#f2f0f1",
    textAlign: "center",
    padding: "30px",
    width: "200px",
    borderRadius: "10px",
    margin: "10px !important",
  },
  inputField: {
    marginBottom: "20px !important",
  },
  textArea: {
    width: "100%",
    marginBottom: "20px",
    fontSize: "16px",
    padding: "10px",
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    miHeight: "10vh",
    padding: "20px",
    justifyContent: "center",
    backgroundColor: "#f2f0f1",
    flexDirection: "column",
  },
  footerText: {
    paddingBottom: "10px",
  },
  footerDate: {
    opacity: "0.4",
  },
  testimonialCard: {
    backgroundColor: "#fff",
    padding: "10px",
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
  },
  testimonialStatement: {
    paddingBottom: "25px",
  },
  avatar: {
    marginRight: "10px",
  },
  testimonialPosition: {
    fontSize: "14px",
    opacity: "0.6",
  },
};

const Hero = () => {
  const router = useRouter();

  return (
    <Box style={styles.heroBox}>
      <Grid container spacing={6} style={styles.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} style={styles.title1}>
            Invest
          </Typography>
          <Typography variant="h3" fontWeight={700} style={styles.title2}>
            Commit
          </Typography>
          <Typography variant="h6" style={styles.subtitle}>
          Commit to the projects and people that matter to you most. Commit inverts traditional fundraising by combining the power of founders and their early supporters from day 1.s
          </Typography>
          <Button  onClick={() => router.push("/")} variant="contained" color="primary" sx={{ width: "200px", fontSize: "16px" }}>
            Discover more
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src="assets/images/happyTeam.jpeg" alt="My Team" style={styles.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
