import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/pass_Manager"; // Local MongoDB
mongoose
  .connect(mongoURI)
  
// Define Schema and Model
const passwordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

const Password = mongoose.model("Password", passwordSchema);

// API Endpoints
app.get("/passwords", async (req, res) => {
  const passwords = await Password.find();
  res.json(passwords);
});

app.post("/passwords", async (req, res) => {
  const newPassword = new Password(req.body);
  await newPassword.save();
  res.status(201).send("Password added successfully");
});

app.delete("/passwords/:id", async (req, res) => {
  const { id } = req.params;
  await Password.findByIdAndDelete(id);
  res.send("Password deleted successfully");
});

app.put("/passwords/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  await Password.findByIdAndUpdate(id, updatedData);
  res.send("Password updated successfully");
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
