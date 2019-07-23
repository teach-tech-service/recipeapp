import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function(value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40
  }
});

export default mongoose.model("user", UserSchema);
