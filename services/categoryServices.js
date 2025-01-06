import CategoryModel from '../app/model/categoryModel.js';


// Create blogs categories => Category can make Admin or Applications owner
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



// Get categories list
export const CategoryListService = async () => {
    try {

        const data = await CategoryModel.find();
        return {status: "success", data: data}

    }catch(e) {
        console.log(e.toString());
        return {status: "Error", message: "Internal server error"};
    }
}