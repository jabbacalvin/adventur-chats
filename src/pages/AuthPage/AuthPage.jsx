import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Box, Tab } from "@mui/material/";
import { TabContext, TabList, TabPanel } from "@mui/lab/";

export default function AuthPage({ setUser }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Login" value="1" />
            <Tab label="Sign up" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <LoginForm setUser={setUser} />
        </TabPanel>
        <TabPanel value="2">
          <SignUpForm setUser={setUser} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
