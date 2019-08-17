import express from "express";
import mongodbConnection from "./config/db";
import recipeRoutes from "./routes/recipe";
import searchRoutes from "./routes/search";
import statisticsRoutes from "./routes/statistics";
import dotenv from "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT || 5000,
  MONGO_DB_URL =
    process.env.MONGOLAB_URI || "mongodb://localhost:27017/recipeapp",
  app = express();

mongodbConnection(MONGO_DB_URL);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/recipe", recipeRoutes());
app.use("/api/search", searchRoutes());
app.use("/api/statistics", statisticsRoutes());

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
