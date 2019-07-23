import { Schema } from "mongoose";

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

export default ingredientSchema