import Recipes from "../models/recipe";
import { groupByWithCount } from "../helpers/groupBy";

export async function getNumberOfRecipes(req, res) {}

export async function getCuisines(req, res) {
  const recipes = await groupByWithCount("cuisine");
  res.send({ recipes });
}

export async function getDifficulty(req, res) {
  const recipes = await groupByWithCount("difficulty");
  res.send({ recipes });
}
