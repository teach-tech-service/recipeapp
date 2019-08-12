import RecipeModel from "../models/recipe";
import { Types } from "mongoose";

const { ObjectId } = Types;

export async function getRecipeById(req, res) {
    const { id } = req.params;
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
        const numberofRecipes = await RecipeModel.countDocuments({});
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

export function getRecipeInfo(req, res) {
    const getDistinctAllergens = async function() {
        const distinctAllergens = await RecipeModel.aggregate([
            {
                $unwind: "$allergens"
            },
            {
                $group: {
                    _id: "$allergens.name",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    count: 1
                }
            }
        ]);
        return distinctAllergens;
    };

    const getDistinctCuisine = async function() {
        const distinctCuisine = await RecipeModel.aggregate([
            {
                $group: {
                    _id: "$cuisine",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    count: 1
                }
            }
        ]);
        return distinctCuisine;
    };

    Promise.all([getDistinctAllergens(), getDistinctCuisine()]).then(result => {
        res.send({
            allergens: result[0],
            cuisine: result[1]
        });
    });
}

export async function postRecipe(req, res) {
    let recipe = new RecipeModel(req.body.recipe);
    recipe.save(err => {
        if (err) {
            console.log(err);
            return res.status(400).send({ err });
        }
        res.send({});
    });
}
