import express from 'express';
import { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion, getQuiz, approveQuestion } from '../controllers/questionsControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/quiz', getQuiz);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/', authMiddleware, createQuestion);
router.put('/:id', authMiddleware, updateQuestion);
router.patch('/:id/approve', authMiddleware, approveQuestion);
router.delete('/:id', authMiddleware, deleteQuestion);

export default router;