import React, { useEffect, useState } from "react";
import { getAll, create, deleteOne, update } from "../../utilities/visits-api";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
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
      console.log(response);
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
      await updateVisit(editVisit._id, {
        title,
        description,
        startDate,
        endDate,
        location,
      });
      setEditVisit(null); // Reset editing state
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
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h3">Add a Visit</Typography>
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="h4">End Date</Typography>
          <TextField
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary">
            {editVisit ? "Update Visit" : "Add Visit"}
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h3">Added Visits</Typography>
        <List>
          {visits.map((visit) => (
            <ListItem
              key={visit._id}
              disablePadding
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <ListItemText
                primary={`Title: ${visit.title}`}
                secondary={
                  <React.Fragment>
                    <Typography variant="body2">
                      Description: {visit.description}{" "}
                    </Typography>{" "}
                    <Typography variant="body2">
                      Start Date: {visit.startDate}{" "}
                    </Typography>{" "}
                    <Typography variant="body2">
                      End Date: {visit.endDate}{" "}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteVisit(visit._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => initiateUpdate(visit)}
                    >
                      Edit
                    </Button>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
