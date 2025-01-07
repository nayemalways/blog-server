import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
{
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    phone:  {type: String, required: true},
    img:  {type: String, required: true},
    otp: {type: String, default: 0}
},
{
    timestamps: true,
    versionKey: false
}
);

const DataModel = mongoose.model("users", DataSchema);
export default DataModel;