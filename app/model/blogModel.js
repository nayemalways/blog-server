import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
{
   title: {type: String, required: true},
   description: {type: String, required: true},
   img: {type: String},
   userId: {type: String, required: true}
},
{
    timestamps: true,
    versionKey: false
}
);

const BlogModel = mongoose.model("blog", DataSchema);
export default BlogModel;