import { 
    CategoryCreateService, 
    CategoryListService, 
    UpdateCategoryService 
} from "../../services/categoryServices.js";




// Create blogs categories (Only Admin)
export const CreateCategory = async (req, res) => {
    const result = await CategoryCreateService(req);
    res.json(result);
}


// Update category (Only Admin)
export const UpdateCategory = async (req, res) => {
    const result = await UpdateCategoryService(req);
    res.json(result);
}


// Get category lists
export const CategoryList = async (req, res) => {
    const result = await CategoryListService(req);
    res.json(result);
}