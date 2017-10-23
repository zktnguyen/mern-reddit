import express from 'express';

// Controller imports
import controller from '../controllers/controller';

const router = express.Router();

router.get('/', controller.getMessage);

export default router;