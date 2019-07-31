import RecipeModel from "../models/recipe";
import { Types } from "mongoose";

const { ObjectId } = Types;

export async function getRecipeById(req, res) {
  const {id} = req.params
  if (!id) {
    return res.status(400).send({});
  }

  const recipe = await RecipeModel.findOne({
    _id: new ObjectId(id)
  });

  if (!recipe) {
    return res.status(404).send({});
  }

  res.send({ recipe });
}

export function getRecipePage(req, res) {
  console.log((Number(req.params.page) - 1) * 10);
  const getRecipePage = async function() {
    const recipes = await RecipeModel.aggregate([
      {
        $skip: (Number(req.params.page) - 1) * 10
      },
      {
        $limit: 10
      }
    ]);
    return recipes;
  };

  const getNumberOfRecipes = async function() {
    const numberofRecipes = await RecipeModel.count({});
    return numberofRecipes;
  };

  Promise.all([getRecipePage(), getNumberOfRecipes()]).then(result => {
    if (result[0].length === 0) {
      return res.status(404).send({
        numberOfRecipes: result[1],
        currentPage: req.params.page
      });
    }
    res.send({
      recipes: result[0],
      numberOfRecipes: result[1],
      currentPage: req.params.page
    });
  });
}
