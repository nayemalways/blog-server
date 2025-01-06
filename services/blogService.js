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


  // Read All Blog
export const AllBlogReadServices = async (req) => {
  try {
    const data = await BlogModel.find();
     if(!data || data.length === 0){
       return res.status(400).json({status: "failed", message: "Blog can't read"});
     }else{
       return  {status: "success", data: data};
     }
  }catch(e){
     return {status: "Error", message: e.toString()}
  }
};

 // Read Single Blog
 export const singleBlogRead = async (req) => {
  try {
    const id = new ObjectId(req.params.id);
    const query = {_id: id};
    const data = await BlogModel.find(query);
     if(!data || data.length === 0){
       return  {status: "failed", message: "Blog read create"};
     }else{
       return  {status: "success", data: data};
     }
  }catch(e){
     return {status: "Error", message: e.toString()}
  }
};