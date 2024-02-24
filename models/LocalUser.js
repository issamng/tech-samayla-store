import bcrypt from 'bcrypt';
import { Schema, model, models } from "mongoose";

const LocalUserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
// Hashing password
LocalUserSchema.post("validate", function (user) {
  const plaintextPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(plaintextPassword, salt);
});

export const LocalUser =
  models?.LocalUser || model("LocalUser", LocalUserSchema);
