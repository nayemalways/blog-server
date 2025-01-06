import { CategoryCreateService } from "../../services/categoryServices.js";



export const CreateCategory = async (req, res) => {
    const result = await CategoryCreateService(req);
    res.json(result);
}