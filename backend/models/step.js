import { Schema } from "mongoose";

const stepSchema = new Schema({
  number: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  image: {
    type: String
  }
});

export default stepSchema;
