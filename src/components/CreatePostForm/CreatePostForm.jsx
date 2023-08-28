import React from "react";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import CategoryCheckbox from "../CategoryCheckbox/CategoryCheckbox";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Grid,
} from "@mui/material";

function CreatePostForm({
  title,
  setTitle,
  content,
  setContent,
  addPost,
  setActiveCat,
  activeCat,
  locationData,
  setLocationData,
}) {
  console.log(activeCat);
  return (
    <form onSubmit={addPost}>
      <Typography variant="h3" className="post-title" align="center">
        Create a New Post
      </Typography>
      <Container className="MuiContainer-root form-container">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          className="form-input"
        />

        <Grid sx={{ m: 1 }}>
          <PlacesAutocomplete
            locationData={locationData}
            setLocationData={setLocationData}
          />
        </Grid>

        <label className="MuiFormLabel-root MuiInputLabel-root form-label"></label>
        <Container className="MuiContainer-root form-categories">
          <CategoryCheckbox activeCat={activeCat} setActiveCat={setActiveCat} />
        </Container>
        <Box mt={2} mb={2}>
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            className="form-input"
          />
        </Box>

        <Box pb={2}>
          <Button type="submit" variant="contained" className="form-button">
            Submit
          </Button>
        </Box>
      </Container>
    </form>
  );
}

export default CreatePostForm;
