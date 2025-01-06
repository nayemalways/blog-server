// Dependencies
import BlogModel from "../app/model/blogModel.js";
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types;


// Blog Creating
export const BlogCreateServices = async (req) => {
    try {

      const userId = req.headers['user_id'];
      const reqBody = req.body;
      reqBody.userId = userId;

      // Checked important data found or not from user's . If found it will create Blogs
      if(reqBody.title && reqBody.description){
         const data = await BlogModel.create(reqBody);
         return{status: "success", data: data}
       } 


      // If not created Blogs than return this response
      return {status: "failed", message: "Blog can't create"};

    }catch(e){
       return {status: "Error", message: e.toString()}
    }
  };


  // Read All Blogs
export const AllBlogReadServices = async () => {
  try {

    const data = await BlogModel.find();
    return  {status: "success", data: data};

  }catch(e){
     return {status: "Error", message: e.toString()}
  }
};




 // Blog details
 export const blogDetailsService = async (req) => {
  try {

    const id = new ObjectId(req.params.id);
    const data = await BlogModel.find({_id: id});

    // If "data" has no data(blog) by specific id return this message
    if(!data || data.length === 0){
       return  {status: "failed", message: "No blog found"};
    } 

    // If data found by specific blogs id , returns this message
    return {status: "success", data: data};

  }catch(e){
    console.log(e.toString());
     return {status: "Error", message: "Internal server error"}
  }
};