import slugify from "slugify";

import Product from "../models/Products.js";

const generateSlug = async (name, model) => {
    const baseSlug = slugify(name, {
        lower: true,
        strict: true,
    });

    let slug;
    let isUnique = false;

    while (!isUnique) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random suffix
        slug = `${baseSlug}-${randomSuffix}`;
        
        // Check if slug exists in the model
        const existingRecord = await Product.findOne({ slug });
        
        if (!existingRecord) {
            isUnique = true;
        }
    }

    return slug;
};

export default generateSlug;
