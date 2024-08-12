import mongoose from "mongoose";

const { Schema } = mongoose;
const PairingSchema = new Schema({
  ingredients: { type: Array, required: true },
  reason: { type: String, required: true },
});

const Pairing =
  mongoose.models.Pairing || mongoose.model("Pairing", PairingSchema);

export default Pairing;
