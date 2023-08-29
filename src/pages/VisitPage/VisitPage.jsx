import React, { useEffect, useState } from "react";
import { getAll, create, deleteOne, update } from "../../utilities/visits-api";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./VisitPage.css";

export default function VisitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [visits, setVisits] = useState([]);
  const [editVisit, setEditVisit] = useState(null);

  const isoToDateFormat = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const response = await getAll();
      setVisits(response.data);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  const addVisit = async (newVisit) => {
    try {
      const response = await create(newVisit);
      console.log("Visit added:", response.data);
      fetchVisits();
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  };

  const deleteVisit = async (id) => {
    try {
      await deleteOne(id);
      fetchVisits();
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  };

  const updateVisit = async (id, updatedData) => {
    try {
      await update(id, updatedData);
      fetchVisits();
    } catch (error) {
      console.error("Error updating visit:", error);
    }
  };

  const initiateUpdate = (visit) => {
    setEditVisit(visit);
    setTitle(visit.title);
    setDescription(visit.description);
    setStartDate(visit.startDate);
    setEndDate(visit.endDate);
    setLocation(visit.location);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (editVisit) {
      const updatedVisit = await updateVisit(editVisit._id, {
        title,
        description,
        startDate,
        endDate,
        location,
      });
      console.log(updatedVisit);
      setEditVisit(null);
    } else {
      const newVisit = {
        title,
        description,
        startDate,
        endDate,
        location,
      };

      await addVisit(newVisit);
    }

    // Reset form fields
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setLocation("");

    fetchVisits();
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/realistic-travel-background-with-elements_52683-77784.jpg?w=1380&t=st=1693195151~exp=1693195751~hmac=186b2ebb0f99f3e3ee7eb7d4127962ce143cfd88a8615b7510b1d6d1dfb17eed")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.2)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Paper elevation={3} sx={{ padding: 3, border: "2px solid black" }}>
          <div style={{ maxHeight: "40vh", overflow: "auto" }}>
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", fontSize: "44px" }}
            >
              Trips
            </Typography>
            <List>
              {visits.map((visit) => (
                <ListItem
                  key={visit._id}
                  disablePadding
                  sx={{
                    border: "3px solid black",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <ListItemText
                    primary={`Title: ${visit.title}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          variant="body2"
                          style={{ fontSize: "22px" }}
                        >
                          Description: {visit.description}
                        </Typography>{" "}
                        <Typography
                          variant="body2"
                          style={{ fontSize: "22px" }}
                        >
                          Start Date: {visit.startDate}
                        </Typography>{" "}
                        <Typography
                          variant="body2"
                          style={{ fontSize: "22px" }}
                        >
                          End Date: {visit.endDate}
                        </Typography>
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteVisit(visit._id)}
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              marginRight: "10px",
                              padding: "5px 10px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <DeleteIcon style={{ marginRight: "5px" }} /> Delete
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => initiateUpdate(visit)}
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              padding: "5px 20px",
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
        <br />
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginBottom: 3,
            border: "3px solid black",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            {editVisit ? "Edit Trip" : "Add a Trip"}
          </Typography>
          <form onSubmit={submitForm}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextareaAutosize
              minRows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <Typography variant="h4">Start Date</Typography>
            <TextField
              type="date"
              value={startDate ? isoToDateFormat(startDate) : ""}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Typography variant="h4">End Date</Typography>
            <TextField
              type="date"
              value={endDate ? isoToDateFormat(endDate) : ""}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary">
              {editVisit ? "Update Visit" : "Add Visit"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
