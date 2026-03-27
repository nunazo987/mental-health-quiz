import express from 'express';
import { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionsControllers.js';

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;