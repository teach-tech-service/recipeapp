import mongoose, { Schema } from "mongoose";
import { difficultyEnums } from "../enums/recipe";
import ingredientSchema from "./ingredient";
import stepSchema from "./step";
import allergenSchema from "./allergens";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  upvotes: {
    type: Number,
    default: 0,
    required: true
  },
  difficulty: {
    type: String,
    default: "easy",
    enum: difficultyEnums,
    required: true
  },
  time: {
    type: String,
    default: "1:00",
    required: true
  },
  heroImage: {
    type: String,
    default: "1.jpeg",
    required: true
  },
  ingredients: [ingredientSchema],
  steps: [stepSchema],
  allergens: [allergenSchema],
  author: {
    type: String,
    default: "john",
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  }
});
export default mongoose.model("recipe", recipeSchema);
