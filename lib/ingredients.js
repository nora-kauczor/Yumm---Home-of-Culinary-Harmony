export const ingredients = [
  { _id: "1", name: "Apple", flavorProfile: "Sweet" },
  { _id: "2", name: "Cheddar", flavorProfile: "Savory" },
  { _id: "3", name: "Pork", flavorProfile: "Savory" },
  { _id: "4", name: "Cinnamon", flavorProfile: "Spicy" },
  { _id: "5", name: "Salmon", flavorProfile: "Umami" },
  { _id: "6", name: "Avocado", flavorProfile: "Creamy" },
  { _id: "7", name: "Soy Sauce", flavorProfile: "Salty" },
  { _id: "8", name: "Basil", flavorProfile: "Herbal" },
  { _id: "9", name: "Tomato", flavorProfile: "Sour" },
  { _id: "10", name: "Mozzarella", flavorProfile: "Creamy" },
  { _id: "11", name: "Garlic", flavorProfile: "Pungent" },
  { _id: "12", name: "Rosemary", flavorProfile: "Herbal" },
  { _id: "13", name: "Lemon", flavorProfile: "Sour" },
  { _id: "14", name: "Beef", flavorProfile: "Savory" },
  { _id: "15", name: "Red Wine", flavorProfile: "Bitter" },
  { _id: "16", name: "Chocolate", flavorProfile: "Bitter" },
  { _id: "17", name: "Chili", flavorProfile: "Spicy" },
  { _id: "18", name: "Mint", flavorProfile: "Fresh" },
  { _id: "19", name: "Strawberry", flavorProfile: "Sweet" },
  { _id: "20", name: "Balsamic Vinegar", flavorProfile: "Sour" },
  { _id: "21", name: "Ginger", flavorProfile: "Spicy" },
  { _id: "22", name: "Honey", flavorProfile: "Sweet" },
  { _id: "23", name: "Soybean", flavorProfile: "Umami" },
  { _id: "24", name: "Wasabi", flavorProfile: "Spicy" },
  { _id: "25", name: "Peanut", flavorProfile: "Savory" },
  { _id: "26", name: "Coconut", flavorProfile: "Sweet" },
  { _id: "27", name: "Lime", flavorProfile: "Sour" },
  { _id: "28", name: "Coriander", flavorProfile: "Herbal" },
  { _id: "29", name: "Yogurt", flavorProfile: "Tangy" },
  { _id: "30", name: "Cucumber", flavorProfile: "Fresh" },
];

const extractedFlavors = ingredients.map(
  (ingredient) => ingredient.flavorProfile
);
extractedFlavors.forEach((flavor) => [...flavor]);
const flavors = Array.from(new Set(extractedFlavors));
export { flavors };
