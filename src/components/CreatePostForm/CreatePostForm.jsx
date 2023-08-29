import React, { useState } from "react";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import CategoryCheckbox from "../CategoryCheckbox/CategoryCheckbox";
import ImageUpload from "../ImageUpload/ImageUpload";

import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Modal,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CreatePostForm({
  profile,
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imagesChanged, setImagesChanged] = useState(false);
  const [postImages, setPostImages] = useState([]);

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
          <Grid sx={{ marginBottom: 2 }}>
            <Button variant="outlined" onClick={handleOpen}>
              Add Images
            </Button>
          </Grid>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 450,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2">
                Add Pictures
              </Typography>
              {imagesChanged ? (
                ""
              ) : (
                <IconButton
                  onClick={handleClose}
                  sx={{ position: "absolute", right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              )}
              <>
                <ImageUpload
                  imageFor={"profile"}
                  id={0}
                  imageListColumns={3}
                  imageListHeight={"150"}
                  imageListWidth={"400"}
                  progressBarWidth={"25.5rem"}
                  alertBoxWidth={"23.5rem"}
                  profilePics={postImages}
                  setProfilePics={setPostImages}
                  setImagesChanged={setImagesChanged}
                  getImageList={(imageList) => {
                    // setFormData({
                    //   ...formData,
                    //   profilePicsNew: imageList.map((image) => image._id),
                    // });
                  }}
                />
                <Button
                  // onClick={handleSubmit}
                  variant="contained"
                  sx={{ m: 1, float: "right" }}
                >
                  Save
                </Button>
              </>
            </Box>
          </Modal>
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
              sx={{ backgroundColor: "#ffffff" }} // Set background color to white
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
