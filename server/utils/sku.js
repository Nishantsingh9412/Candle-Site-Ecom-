import { v4 as uuidv4 } from 'uuid';

const generateSKU = (prefix = "SKU") => {
  return `${prefix}-${uuidv4().split("-")[0].toUpperCase()}`;
};

export default generateSKU;
