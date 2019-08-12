import { Schema } from "mongoose";

const stepSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

export default stepSchema;
