// import React, { useEffect, useState } from "react";
// import { getAll, create,  } from "../../utilities/visits-api"

// export default function VisitPage() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [location, setLocation] = useState("");
//   const [visits, setVisits] = useState([]);

//  useEffect(() => {
//     fetchVisits();
//   }, []);


//   const fetchVisits = async () => {
//     try {
//       const response = await getAll(); // Replace with your API endpoint
//       setVisits(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching visits:", error);
//     }
//   };
  

//   const addVisit = async (e) => {
//     e.preventDefault();

//     const newVisit = {
//       title,
//       description,
//       startDate,
//       endDate,
//       location,
//     };

//     try {
//       const response = await create(newVisit);
//       console.log(response);
//       console.log("Visit added:", response.data);

//       // Clear form fields after successful submission
//       setTitle("");
//       setDescription("");
//       setStartDate("");
//       setEndDate("");
//       setLocation("");

//       // Fetch updated visits after adding a new visit
//       fetchVisits();
//     } catch (error) {
//       console.error("Error adding visit:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add a Visit</h2>
//       <form onSubmit={addVisit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Start Date:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>End Date:</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//         <button type="submit">Add Visit</button>
//       </form>

//       <div>
//         <h2>Added Visits</h2>
//         <ul>
//           {visits.map((visit) => (
//             <li key={visit._id}>
//               <p>Title: {visit.title}</p>
//               <p>Description: {visit.description}</p>
//               <p>Start Date: {visit.startDate}</p>
//               <p>End Date: {visit.endDate}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { getAll, create } from "../../utilities/visits-api";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function VisitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [visits, setVisits] = useState([]);

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

  const addVisit = async (e) => {
    e.preventDefault();

    const newVisit = {
      title,
      description,
      startDate,
      endDate,
      location,
    };

    try {
      const response = await create(newVisit);
      console.log(response);
      console.log("Visit added:", response.data);

      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setLocation("");

      fetchVisits();
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  };

  

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Add a Visit</Typography>
        <form onSubmit={addVisit}>
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
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Add Visit
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6">Added Visits</Typography>
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
                      Description: {visit.description}
                    </Typography>
                    <Typography variant="body2">
                      Start Date: {visit.startDate}
                    </Typography>
                    <Typography variant="body2">
                      End Date: {visit.endDate}
                    </Typography>
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