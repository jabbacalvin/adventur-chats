import { useState } from "react";
import { IconButton, Card, CardMedia, Tooltip } from "@mui/material/";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export default function AvatarRandomizer({
  onChange,
  avatar,
  setAvatar,
  name = "Avatar",
}) {
  const randomSeed = () => {
    return Math.floor(Math.random() * 9999999999);
  };

  const resetSeed = () => {
    let newSeed = randomSeed();
    setAvatar((prevAvatar) => {
      const newAvatar = {
        ...prevAvatar,
        name: name,
        url: `https://api.dicebear.com/6.x/pixel-art/svg?seed=${newSeed}`,
      };
      return newAvatar;
    });
  };

  const handleRandomizeClick = (e) => {
    resetSeed();
    onChange(e);
  };

  return (
    <Card raised={true} sx={{ maxWidth: "150px" }}>
      <CardMedia
        component="img"
        sx={{
          objectFit: "contain",
        }}
        image={avatar.url}
        alt="dicebears avatar"
      />
      <Tooltip title="Shuffle" placement="right-start">
        <IconButton
          sx={{ float: "right" }}
          color="primary"
          size="small"
          aria-label="new avatar"
          onClick={handleRandomizeClick}
        >
          <ShuffleIcon />
        </IconButton>
      </Tooltip>
    </Card>
  );
}
