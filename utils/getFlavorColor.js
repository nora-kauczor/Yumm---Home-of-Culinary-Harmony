export function getFlavorColor(flavor) {
  const flavorLowerCase = flavor.toLowerCase();
  const flavorColor = `var(--${flavorLowerCase}-color)`;
  return flavorColor;
}
