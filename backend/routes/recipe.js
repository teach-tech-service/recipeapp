import {
  getRecipeById,
  getRecipePage,
  getRecipeInfo
} from "../controllers/recipe";

export default router => {
  router.get("/info", getRecipeInfo);
  router.get("/page/:page", getRecipePage);
  router.get("/:id", getRecipeById);
  return router;
};
