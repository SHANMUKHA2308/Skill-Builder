import express from 'express';
import { handleVideoSearch } from '../controllers/videoController.js';

const router = express.Router();

router.get('/search', handleVideoSearch);

export default router; 