const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://<>:<>@cluster0.gi72v8f.mongodb.net/" + "DDos"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Traffic schema and model
const trafficSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
});

const Traffic = mongoose.model("Traffic", trafficSchema);

// API to receive traffic (simulated data packets)
app.get("/api/send-packet", async (req, res) => {
  const packet = new Traffic();
  await packet.save();
  res.status(200).send("Packet received");
});

// API to calculate entropy
app.get("/api/entropy", async (req, res) => {
  const trafficData = await Traffic.find();
  const intervals = [];

  // Calculate intervals between packets
  for (let i = 1; i < trafficData.length; i++) {
    intervals.push(trafficData[i].timestamp - trafficData[i - 1].timestamp);
  }

  const intervalCounts = intervals.reduce((acc, interval) => {
    acc[interval] = (acc[interval] || 0) + 1;
    return acc;
  }, {});

  const totalIntervals = intervals.length;
  let entropy = 0;

  for (const count of Object.values(intervalCounts)) {
    const probability = count / totalIntervals;
    entropy -= probability * Math.log2(probability);
  }

  res.json({ entropy });
});

app.get("/", (req, res) => {
  res.send("Hello Somya");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
