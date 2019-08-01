import RecipeModel from "../models/recipe";

export async function searchRecipe(req, res) {
  const allowParameters = [
    "cuisine",
    "term",
    "allergens",
    "difficulty"
  ];
  let matchObj = {};

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
  const filteredRecipes = await RecipeModel.aggregate([{ $match: matchObj }]);
  res.send(filteredRecipes);
}

// db.recipes.find({"allergens":{
//   $elemMatch: {
//       name: "milk"
//   }
// }})

// db.recipes.aggregate([
//   {
//     $unwind:"$allergens"
//   },
//   {
//       $group: {
//           _id: {
//               _id: "$_id",
//               value: "milk"
//           },
//           array: {
//               $push: "$allergens.name"
//           }
//       }
//   },
//   {
//       array: {
//           $elemMatch: {

//           }
//       }
//   }
//   ])
