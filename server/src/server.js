const http = require("http");
require("dotenv").config();

const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const app = require("./app");

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  await loadLaunchData();

  server
    .listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Please stop the other process or use a different port.`
        );
        process.exit(1);
      } else {
        throw err;
      }
    });
}

startServer();
