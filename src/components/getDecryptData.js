const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3004;

// Enable CORS
app.use(cors());

const videoDirectory="src/PythonDecrypt/Videos"


app.get("/api/getVideos", (req, res) => {
  fs.readdir(videoDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    const videoFiles = files.filter((file) => file.endsWith(".mp4"));

    const videoPaths = videoFiles.map((file) => {
      const relativePath = path.relative(videoDirectory, file);
      return relativePath;
    });
    res.json(videoPaths);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
