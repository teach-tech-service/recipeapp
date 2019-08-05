import mongoose from "mongoose";
import UserModel from "../models/user";
import RecipeModel from "../models/recipe";
import fs from "fs";
import path from "path";

export default URI => {
  mongoose.connect(URI, { useNewUrlParser: true }, err => {
    if (err) {
      throw new Error(`Error while trying to connect MongoDB ${err}`);
    }
    console.log(`Connected to MongoDB on port ${URI}`);

    fs.readFile(path.join(__dirname, "../data/users.json"), (err, data) => {
      if (err) {
        console.log(`[MONGODB] Problem with load users mock data from file`);
      }
      const users = JSON.parse(data);
      UserModel.deleteMany({}).then(() => {
        RecipeModel.deleteMany({}).then(() => {
          UserModel.insertMany(users).then(createdUsers => {
            fs.readFile(
              path.join(__dirname, "../data/recipes.json"),
              (err, data) => {
                if (err) {
                  console.log(
                    `[MONGODB] Problem with recipes load mock data from file`
                  );
                }
                const recipes = JSON.parse(data);
                for (let i = 0; i < recipes.length; i++) {
                  let date = new Date();
                  date.setDate(date.getDate() - i);
                  recipes[i].createdAt = date;
                  recipes[i].author = createdUsers[0]._id;
                }
                RecipeModel.insertMany(recipes);
              }
            );
          });
        });
      });
    });
  });
};
