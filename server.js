// Require dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Create PORT
const PORT = process.env.PORT || 8000;

// Use middleware to set up express server
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use middleware to serve static files
app.use(express.static("public"));

// Connect to mongoose database
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/workout_tracker", {
    useNewUrlParser: true, // Properly parse MongoDB connection strings
    useUnifiedTopology: true // Use the new server discovery and monitoring engine
  })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Workout Tracker running @http://localhost:${PORT}!`);
});
