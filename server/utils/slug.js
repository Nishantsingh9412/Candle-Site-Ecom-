import slugify from "slugify";

const generateSlug = async (name, model) => {
    const baseSlug = slugify(name, {
        lower: true,
        strict: true,
    });

    let slug = baseSlug;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
        // Check if slug exists in the model
        const existingRecord = await model.findOne({ slug });
        
        if (!existingRecord) {
            isUnique = true;
        } else {
            // Only add counter if there's a duplicate
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
    }

    return slug;
};

export default generateSlug;
