import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
    {
        categoryName: {type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const CategoryModel = mongoose.model("categories", DataSchema); 


// Exported Category Models Schema
export default CategoryModel;