import mongoose, { ValidateOpts } from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
  createJWT: () => void;
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
    select: false,
  },
});

UserSchema.pre("save", async function () {
  // hash password use bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export default mongoose.model("User", UserSchema);
