import express from 'express';

// Controller imports
import controller from '../controllers/controller';
import userController from '../controllers/userController';
import postController from '../controllers/postController';
import commentController from '../controllers/commentController';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/', controller.getMessage);

// User routes
router.post('/signup', userController.post);

// Post routes
router.post('/post', postController.post);
router.get('/posts', postController.getAll);

// Comment routes
router.post('/comment', commentController.post);

// Authorization routes
router.post('/auth', authController.post);
router.post('/auth/confirmation', authController.confirmation);
router.post('/auth/reset_password_request', authController.resetPasswordRequest);
router.post('/auth/validate_token', authController.validateToken);
router.post('/auth/reset_password', authController.resetPassword);

export default router;