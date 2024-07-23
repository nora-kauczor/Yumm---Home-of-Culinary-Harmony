import dbConnect from "@/db/connect";
import Ingredient from "@/db/models/Ingredients";
import { getServerSession } from "next-auth";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const ingredient = await Ingredient.find();

    if (!ingredient) {
      response.status(404).json({ status: "Ingredient not found." });
      return;
    }
    return response.status(200).json(ingredient);
  }

  if (request.method === "POST") {
    try {
      const ingredientData = request.body;
      await Ingredient.create(ingredientData);
      response.status(201).json({ status: "Ingredient created." });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    await Ingredient.findByIdAndDelete(id);
    response.status(200).json({ status: "Ingredient deleted!" });
    return;
  }

  if (request.method === "PUT") {
    const updatedIngredient = request.body;
    await Ingredient.findByIdAndUpdate(id, updatedIngredient);
    response.status(200).json({ status: "Ingredient updated" });
    return;
  }

  response.status(405).json({ error: "Method not allowed." });
}
