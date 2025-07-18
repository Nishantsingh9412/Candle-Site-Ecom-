import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    subCategoryName: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    }, { timestamps: true });

export default mongoose.model("SubCategory", SubCategorySchema);    