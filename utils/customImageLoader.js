import Image from "next/image";
// A loader is a function returning a URL string for the image
export default function customImageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`;
}
