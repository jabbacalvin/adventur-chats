import { useState } from "react";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";

export default function ImageUpload({ imageFor /*post || user*/, id }) {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({
    started: false,
    percentageComplete: 0,
  });
  const [message, setMessage] = useState();

  const handleChange = (newFiles) => {
    setFiles(newFiles);
  };

  function handleUpload(e) {
    e.preventDefault();
    if (!files) {
      setMessage("No file selected");
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[i]);
    }

    setMessage("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    axios
      .post(`/api/images/upload/${imageFor}/${id}`, formData, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              percentageComplete: progressEvent.progress * 100,
            };
          });
        },
      })
      .then((res) => {
        setMessage("Upload successful");
        setProgress((prevState) => {
          return { ...prevState, started: true };
        });
        console.log(res.data);
      })
      .catch((err) => {
        setMessage("Upload failed");
        console.error(err);
      });
  }

  return (
    <>
      <MuiFileInput value={files} onChange={handleChange} multiple />
      {/* <Button variant="contained" component="label">
        <CloudUploadIcon />

      </Button> */}
      {/* <input type="file" onChange={(e) => setFiles(e.target.files)} multiple /> */}
      <button onClick={handleUpload}>Upload</button>
      <br />
      {progress.started && (
        <progress max="100" value={progress.percentageComplete}></progress>
      )}
      <br />
      {message && <span>{message}</span>}
    </>
  );
}
