import mongoose from "mongoose";

const { Schema } = mongoose;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  flavorProfile: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String },
});

const Ingredient =
  mongoose.models.Ingredient || mongoose.model("Ingredient", IngredientSchema);

export default Ingredient;
