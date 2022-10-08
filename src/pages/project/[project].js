import { useRouter } from "next/router";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";

const CommitPage = () => {
  const router = useRouter();
  const { project } = router.query;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={"Review Project " + project} />
          <Tab label="Enter Commitment" />
          <Tab label="Submit Commitment" />
        </Tabs>
      </Box>
    </div>
  );
};

export default CommitPage;
