import { AllBlogReadServices, BlogCreateServices, blogDetailsService, UpdateBlogService } from "../../services/blogService.js"

// Create New Blog
export const blogCreate = async (req, res) => {
    try {
        const result = await BlogCreateServices(req);
        res.json(result)
    }catch(e) {

    }
}


// Update blog 
export const updateBlog = async (req, res) => {
    const result = await UpdateBlogService(req);
    res.json(result);
}



// Read all blogs
export const ReadAllBlog = async (req, res) => {
    try {
        const result = await AllBlogReadServices(req);
        res.json(result)
    }catch(e) {

    }
}



// Read single the blog
export const blogDetails = async (req, res) => {
    try {
        const result = await blogDetailsService(req);
        res.json(result)
    }catch(e) {
        res.status(400).json({status: "Error", error: e.toString});
    }
}