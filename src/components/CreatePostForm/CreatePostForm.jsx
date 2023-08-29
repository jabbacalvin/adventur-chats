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
  Paper,
} from "@mui/material";

function CreatePostForm({
  setShowForm,
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
  return (
    <form onSubmit={addPost}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          sx={{
            backgroundColor: "fffff",
            borderRadius: 1,
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            width: "100%",
          }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: "#ffffff" }}
          />

          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <PlacesAutocomplete
              locationData={locationData}
              setLocationData={setLocationData}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </Grid>
          <Grid sx={{ marginBottom: 2 }}>
            <CategoryCheckbox
              activeCat={activeCat}
              setActiveCat={setActiveCat}
              sx={{ backgroundColor: "#ffffff" }} 
            />
          </Grid>

          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: "#ffffff" }}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => setShowForm(false)}
              variant="outlined"
              sx={{ marginRight: 1 }}
            >
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </form>
  );
}

export default CreatePostForm;
