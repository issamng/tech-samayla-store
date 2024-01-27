import mongoose, { Schema, model, models } from "mongoose";

const UserInformationSchema = new Schema({
  userEmail: {type:String, unique:true, required:true},
  firstName: String,
  lastName: String,
  email: String,
  city: String,
  postalCode: String,
  adress: String,
  country: String,
});

export const UserInformation =
  models?.UserInformation || model("UserInformation", UserInformationSchema);
