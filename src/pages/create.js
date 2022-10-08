import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";

const CommitPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Enter Project Info" />
          <Tab label="Submit Project" />
        </Tabs>
      </Box>
    </div>
  );
};

export default CommitPage;
