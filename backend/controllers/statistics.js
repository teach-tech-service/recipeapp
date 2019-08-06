import Recipes from "../models/recipe";
import { groupByWithCount } from "../helpers/groupBy";

export async function getNumberOfRecipes(req, res) {
  const recipes = await Recipes.find({}).sort({ createdAt: 1 });
  let recipeWithDates = [];
  for (let i = 0; i < recipes.length; i++) {
    let count = 1;
    for (let k = 0; k < recipes.length; k++) {
      if (k !== i && recipes[i].createdAt >= recipes[k].createdAt) {
        count++;
      }
    }
    let isInside = false;
    for (let k = 0; k < recipeWithDates.length; k++) {
      if (
        recipes[i].createdAt.getDate() == recipeWithDates[k].date.getDate() &&
        recipes[i].createdAt.getMonth() == recipeWithDates[k].date.getMonth() &&
        recipes[i].createdAt.getFullYear() ==
          recipeWithDates[k].date.getFullYear()
      ) {
        isInside = true;
      }
    }
    if (!isInside) {
      recipeWithDates.push({
        date: recipes[i].createdAt,
        count
      });
    }
  }

  let weekBehind = new Date();
  weekBehind.setDate(weekBehind.getDate() - Number(req.params.numberOfDays));
  console.log(recipeWithDates);
  console.log(weekBehind);
  let arr = [];
  for (let i = recipeWithDates.length - 1; i >= 0; i--) {
    if (
      (recipeWithDates[i].date.getMonth() == weekBehind.getMonth() &&
        recipeWithDates[i].date.getFullYear() == weekBehind.getFullYear() &&
        recipeWithDates[i].date.getDate() < weekBehind.getDate()) ||
      (recipeWithDates[i].date.getMonth() < weekBehind.getMonth() &&
        recipeWithDates[i].date.getFullYear() <= weekBehind.getFullYear())
    ) {
      recipeWithDates.splice(i, 1);
    }
  }
  res.send({
    recipes: recipeWithDates
  });
}

export async function getCuisines(req, res) {
  const recipes = await groupByWithCount("cuisine");
  res.send({ recipes });
}

export async function getDifficulty(req, res) {
  const recipes = await groupByWithCount("difficulty");
  res.send({ recipes });
}
