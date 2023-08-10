import express from "express";
import { 
    addBlogs, 
    deleteBlogById, 
    getAllBlog, 
    getBlogById, 
    getUserById, 
    updateBlog 
} from "../controllers/blogController.js";

const router = express.Router();

router.get('/getAllBlogs', getAllBlog);
router.post('/add-blog', addBlogs);
router.put('/update-blog/:id', updateBlog);
router.get('/getById/:id', getBlogById);
router.delete('/deleteById/:id', deleteBlogById);
router.get('/user/:id', getUserById);

// EXPORT THE EOUTERS
const blogRouter = router;
export default blogRouter;