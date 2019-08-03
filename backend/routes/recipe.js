import express from "express";
import {
  getRecipeById,
  getRecipePage,
  getRecipeInfo
} from "../controllers/recipe";

const router = express.Router();

export default () => {
  router.get("/info", getRecipeInfo);
  router.get("/page/:page", getRecipePage);
  router.get("/:id", getRecipeById);
  return router;
};
