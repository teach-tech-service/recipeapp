import { getRecipeByName, getRecipePage } from "../controllers/recipe";

export default router => {
  router.get("/page/:page", getRecipePage);
  router.get("/:name", getRecipeByName);
  return router;
};
