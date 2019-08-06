import RecipeModel from "../models/recipe";

export async function searchRecipe(req, res) {
  const allowParameters = ["cuisine", "term", "allergens", "difficulty"];
  let matchObj = {};

  if (!req.query.page) {
    req.query.page = 1;
  }

  for (let i = 0; i < allowParameters.length; i++) {
    if (req.query[allowParameters[i]] && req.query[allowParameters[i]] !== "") {
      if (allowParameters[i] === "allergens") {
        matchObj[allowParameters[i]] = {
          $elemMatch: {
            name: req.query[allowParameters[i]]
          }
        };
      } else if (allowParameters[i] === "term") {
        matchObj = {
          ...matchObj,
          $or: [
            { name: new RegExp(req.query["term"], "igm") },
            { description: new RegExp(req.query["term"], "igm") },
            { cuisine: new RegExp(req.query["term"], "igm") }
          ]
        };
      } else {
        matchObj[allowParameters[i]] = req.query[allowParameters[i]];
      }
    }
  }

  const countRows = async () => {
    const count = await RecipeModel.countDocuments(matchObj);
    return count;
  };
  const filter = async () => {
    const filteredRecipes = await RecipeModel.aggregate([
      { $match: matchObj },
      { $sort: { createdAt: -1 } },
      { $skip: (Number(req.query.page) - 1) * 10 },
      { $limit: 10 }
    ]);
    return filteredRecipes;
  };

  Promise.all([countRows(), filter()]).then(result => {
    res.send({ numberOfRows: result[0], filteredRecipes: result[1] });
  });
}