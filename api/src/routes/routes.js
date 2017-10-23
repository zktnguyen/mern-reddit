import express from 'express';

// Controller imports
import controller from '../controllers/controller';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', controller.getMessage);

// User routes
router.post('/signup', userController.post);

export default router;