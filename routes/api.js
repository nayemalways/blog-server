import express from 'express';
import * as userController from '../app/controllers/userController.js';
import * as blogController from '../app/controllers/blogController.js';
const router = express.Router();


router.post('/Register', userController.Register);
router.post('/Login', userController.Login);


// Blog Services
router.post('/blogCreate', blogController.blogCreate);
router.get('/ReadAll', blogController.ReadAllBlog);
router.get('/ReadSingle/:id', blogController.ReadSingleBlog);
export default router;