import express from 'express';
import * as userController from '../app/controllers/userController.js';
import * as blogController from '../app/controllers/blogController.js';
import * as categoryControllers from '../app/controllers/categoryController.js';
import {authVerify} from '../app/middleware/authMiddleware.js';
const router = express.Router();




// Admin API
router.post('/category', categoryControllers.CreateCategory);


// User's API
router.post('/Register', userController.Register);
router.post('/Login', userController.Login);


// Blog Services APi
router.post('/post-blog', authVerify, blogController.blogCreate);
router.get('/blogs', authVerify, blogController.ReadAllBlog);
router.get('/blog-details/:id', authVerify, blogController.blogDetails);
router.get('/categories', categoryControllers.CategoryList);


export default router;