import { searchRecipe } from "../controllers/search";
import express from "express";

const router = express.Router();

export default () => {
  router.get("/", searchRecipe);
  return router;
};
