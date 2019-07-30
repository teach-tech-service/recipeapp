import { getRecipeById, getRecipePage } from "../controllers/recipe";

export default router => {
  router.get("/page/:page", getRecipePage);
  router.get("/:id", getRecipeById);
  return router;
};
