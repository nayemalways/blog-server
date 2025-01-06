import { 
    AllBlogReadServices, 
    blogByCategoryService, 
    BlogCreateServices, 
    blogDetailsService, 
    DeleteBlogService, 
    UpdateBlogService 
} from "../../services/blogService.js";




/*--------- Only valid user can do get this services start here--------------- */
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


// Delete blog 
export const deleteBlog = async (req, res) => {
    const result = await DeleteBlogService(req);
    res.json(result);
}

/*--------- Only valid user can do get this services end here--------------- */





/*----------- Anyone get this services start here--------------- */
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


export const blogByCategory = async (req, res) => {
    const result = await blogByCategoryService(req);
    res.json(result);
}

/*----------- Anyone get this services start here--------------- */