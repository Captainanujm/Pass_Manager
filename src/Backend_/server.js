import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();


app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI
mongoose
  .connect(mongoURI).then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });
  

const passwordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Password = mongoose.model("Password", passwordSchema);


app.get("/passwords", async (req, res) => {
  const passwords = await Password.find();
  res.json(passwords);
});

app.post("/passwords", async (req, res) => {
  const newPassword = new Password(req.body);
  const saved=await newPassword.save();
  res.status(201).json(saved); 
});

app.delete("/passwords/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  await Password.findByIdAndDelete(id);
  res.send("Password deleted successfully");
});

app.put("/passwords/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  await Password.findByIdAndUpdate(id, updatedData);
  res.send("Password updated successfully");
});

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));