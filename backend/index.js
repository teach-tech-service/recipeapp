import express from "express";
import mongodbConnection from "./config/db";
import recipeRoutes from "./routes/recipe";
import searchRoutes from "./routes/search";
import cors from "cors";

const PORT = process.env.PORT || 5000,
  MONGO_DB_URL =
    process.env.MONGO_DB_URL || "mongodb://localhost:27017/recipeapp",
  app = express();


mongodbConnection(MONGO_DB_URL);
app.use(cors());
app.use("/api/recipe", recipeRoutes());
app.use("/api/search", searchRoutes());

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
