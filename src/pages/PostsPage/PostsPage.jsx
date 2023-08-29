import React from "react";
import PostContainer from "../../components/PostContainer/PostContainer";
import { Box } from "@mui/material";

export default function PostsPage({ profile }) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://i.imgur.com/81zJV97.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.4,
          zIndex: -1,
        }}
      ></div>
      <PostContainer profile={profile} />
    </Box>
  );
}
