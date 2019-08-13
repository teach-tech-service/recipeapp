import "@babel/polyfill";
import express from "express";
import mongodbConnection from "./config/db";
import recipeRoutes from "./routes/recipe";
import searchRoutes from "./routes/search";
import dotenv from "dotenv/config";
import statisticsRoutes from "./routes/statistics";
import path from "path";
import cors from "cors";

const PORT = process.env.PORT || 5000,
  MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/recipeapp",
  app = express();

mongodbConnection(MONGODB_URI);
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/recipe", recipeRoutes());
app.use("/api/search", searchRoutes());
app.use("/api/statistics", statisticsRoutes());
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
