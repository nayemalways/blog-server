import { CategoryCreateService, CategoryListService } from "../../services/categoryServices.js";


// Create blogs categories (Only Admin)
export const CreateCategory = async (req, res) => {
    const result = await CategoryCreateService(req);
    res.json(result);
}


// Get category lists
export const CategoryList = async (req, res) => {
    const result = await CategoryListService(req);
    res.json(result);
}