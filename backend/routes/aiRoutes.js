import express from 'express';
import { handleSkillBuilder } from '../controllers/aiController.js';

const router = express.Router();

router.post('/', handleSkillBuilder);

export default router; 