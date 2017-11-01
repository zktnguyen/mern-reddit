import express from 'express';

// Controller imports
import controller from '../controllers/controller';
import userController from '../controllers/userController';
import postController from '../controllers/postController';
import commentController from '../controllers/commentController';

const router = express.Router();

router.get('/', controller.getMessage);

// User routes
router.post('/signup', userController.post);

// Post routes
router.post('/post', postController.post);
router.get('/posts', postController.getAll);

// Comment routes
router.post('/comment', commentController.post);

export default router;