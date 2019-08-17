import { Schema } from "mongoose";
import allergensEnum from "../enums/allergen";

const allergenSchema = new Schema({
  name: {
    type: String,
    enum: allergensEnum,
    required: true
  }
});

export default allergenSchema;
