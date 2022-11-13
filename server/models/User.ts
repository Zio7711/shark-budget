import mongoose, { ValidateOpts } from "mongoose";

import validator from "validator";

interface User {
  name: string;
  email: {
    validate: {
      validator: (str: string) => boolean;
      message: string;
    };
  };
  password: string;
}
const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email.",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minLength: 6,
  },
});

export default mongoose.model("User", UserSchema);
