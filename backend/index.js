import express from "express";
import mongodbConnection from "./config/db";
import recipeRoutes from "./routes/recipe";

const PORT = process.env.PORT || 5000,
  MONGO_DB_URL =
    process.env.MONGO_DB_URL ||
    "mongodb://localhost:27017/recipeapp",
  app = express();
const Router = express.Router();

mongodbConnection(MONGO_DB_URL);

app.use("/api/recipe", recipeRoutes(Router));

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app