import Recipes from "../models/recipe";

export async function groupByWithCount(field) {
  const recipes = await Recipes.aggregate([
    {
      $group: {
        _id: `$${field}`,
        numberOfRecipes: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        numberOfRecipes: 1
      }
    }
  ]);
  return recipes;
}
