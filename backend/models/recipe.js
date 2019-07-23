import mongoose, { Schema, mongo, SchemaTypes } from "mongoose";
import { difficultyEnums } from "../enums/recipe";
import ingredientSchema from "./ingredient";
import stepSchema from "./step";
import allergenSchema from "./allergens";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 400
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
    default: "",
    required: true
  },
  ingredients: [ingredientSchema],
  steps: [stepSchema],
  allergens: [allergenSchema],
  author: {
    ref: "user",
    type: SchemaTypes.ObjectId
  },
  cuisine: {}
});

export default mongoose.model("recipe", recipeSchema);
