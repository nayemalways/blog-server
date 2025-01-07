import express from 'express';
import * as userController from '../app/controllers/userController.js';
import * as blogController from '../app/controllers/blogController.js';
import * as categoryControllers from '../app/controllers/categoryController.js';
import {authVerify} from '../app/middleware/authMiddleware.js';
const router = express.Router();




// Admin API
router.post('/admin/category', categoryControllers.CreateCategory);
router.put('/admin/update-category/:categoryId', categoryControllers.UpdateCategory);


// User's API
router.post('/Register', userController.Register);
router.post('/Login', userController.Login);
router.post('/post-blog', authVerify, blogController.blogCreate);
router.put('/update-blog/:blogId', authVerify, blogController.updateBlog);
router.delete('/delete/:blogId', authVerify, blogController.deleteBlog);

// User Password Reset
router.post('/forget-password', userController.forgetPassword);
router.post('/otp-verify/:email/:otp', userController.OtpVerify);
router.post('/reset-password', userController.ResetPassword);


// Blog global services APi
router.get('/blogs', blogController.ReadAllBlog);
router.get('/blog-details/:id', blogController.blogDetails);
router.get('/categories', categoryControllers.CategoryList);
router.get('/blogs/category/:categoryId', blogController.blogByCategory);


export default router;