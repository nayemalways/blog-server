import CategoryModel from '../app/model/categoryModel.js';


// Category can make Admin or Applications owner
export const CategoryCreateService = async (req) => {
    try {
        const reqBody = req.body;
        reqBody && await CategoryModel.create(reqBody);
        return {status: "success", message:"Category created success!"}
    }catch(e){
        console.log(e);
        return {status: "Error", message: "Internal server error"}
    }
}