
export default router => {
  router.get("/recipe", searchRecipe);
  return router;
};
