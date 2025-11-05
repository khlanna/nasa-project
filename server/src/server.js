const http = require("http");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://annakhloyan_db_user:OW4LAxYfwawTz01s@nasa.8nxmrkl.mongodb.net/nasa?retryWrites=true&w=majority";

const { loadPlanetsData } = require("./models/planets.model");

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
