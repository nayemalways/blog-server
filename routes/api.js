import express from 'express';
import * as userController from '../app/controllers/userController.js';
import * as blogController from '../app/controllers/blogController.js';
import * as categoryControllers from '../app/controllers/categoryController.js';
import {authVerify} from '../app/middleware/authMiddleware.js';
const router = express.Router();




// Admin API
router.post('/category', categoryControllers.CreateCategory);

router.post('/Register', userController.Register);
router.post('/Login', userController.Login);


// Blog Services
router.post('/blogCreate', authVerify, blogController.blogCreate);
router.get('/ReadAll', authVerify, blogController.ReadAllBlog);
router.get('/ReadSingle/:id', authVerify, blogController.ReadSingleBlog);


export default router;