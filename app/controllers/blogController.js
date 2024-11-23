import { AllBlogReadServices, BlogCreateServices, singleBlogRead } from "../../services/blogService.js"

// Create New Blog
export const blogCreate = async (req, res) => {
    try {
        const result = await BlogCreateServices(req);
        res.json(result)
    }catch(e) {

    }
}

// Read all the blog
export const ReadAllBlog = async (req, res) => {
    try {
        const result = await AllBlogReadServices(req);
        res.json(result)
    }catch(e) {

    }
}
// Read single the blog
export const ReadSingleBlog = async (req, res) => {
    try {
        const result = await singleBlogRead(req);
        res.json(result)
    }catch(e) {
        res.status(400).json({status: "Error", error: e.toString});
    }
}