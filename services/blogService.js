// Dependencies
const {ObjectId} = mongoose.Types;

import BlogModel from "../app/model/blogModel.js";
import mongoose from 'mongoose';



/*--------- Only valid user can do get this services start here--------------- */
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



  // Update blogs 
  export const UpdateBlogService = async (req) => {
    try {
        const userId = req.headers['user_id'];
        const blogId = req.params['blogId'];
        const reqBody = req.body; // Updated data given by user's

        await BlogModel.updateOne( { _id: blogId, userId: userId }, reqBody ); // Updates the blog
        return {status: "success", message: "Blog update success"}; // Returns response after update has complete

    }catch(e) {
      console.log(e.toString());
      return {status: "Error", message: "Internal server error"};
    }
  }



  // Delete blogs
  export const DeleteBlogService = async (req) => {
    try {
      const userId = req.headers['user_id'];
      const blogId = req.params['blogId'];

      await BlogModel.deleteOne( { _id: blogId, userId: userId }); // Delete the blog
      return {status: "success", message: "Blog delete success"}; // Returns response after delete has complete

  }catch(e) {
    console.log(e.toString());
    return {status: "Error", message: "Internal server error"};
  }
  }

  /*--------- Only valid user can do get this services end here--------------- */



/*----------- Anyone get this services start here--------------- */
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


export const blogByCategoryService = async (req) => {
  try {

    const categoryId = req.params['categoryId'];
    const data = await BlogModel.find({categoryId}); // Search data using categoryId

    return {status: "success", data: data};

  }catch(e) {
    console.log(e.toString());
    return {status: "Error", message: "Internal server error"};
  }
}
/*----------- Anyone get this services start here--------------- */