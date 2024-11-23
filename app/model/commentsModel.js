import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
{
   name: {type: String, required: true},
   email: {type: String, required: true},
   comment: {type: String, required: true},
   blogID: {type: mongoose.Schema.Types.ObjectId, required: true}
},
{
    timestamps: true,
    versionKey: false
}
);

const commentsModel = mongoose.model("blog", DataSchema);
export default commentsModel;