import { v4 as uuidv4 } from "uuid";
import Products from "../models/products.js";

const checkIfSKUExists = async (sku) => {
  const alreadySKUExists = await Products.findOne({
    sku: sku,
  });

  if (alreadySKUExists) {
    return true;
  }
  
  return false;
};

const generateUniqueSKU = async (productName) => {
  let sku;
  let attempts = 0;

  do {
    const shortName = productName
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 5);

    const uniqueId = uuidv4().split("-")[0].toUpperCase();
    sku = `${shortName}-${uniqueId}`;

    attempts++;
    if (attempts > 5) {
      throw new Error("Failed to generate unique SKU");
    }
  } while (await checkIfSKUExists(sku));
  return sku;
};

export default generateUniqueSKU;
