import {searchRecipe} from '../controllers/search'

export default router => {
  router.get("/", searchRecipe);
  return router;
};
