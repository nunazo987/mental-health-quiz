import { Request, Response } from 'express';
import { Question } from '../models/questions';

let questions: Question[] = [
    {
    id: 1,
    question: "What is anxiety?",
    options: ["Fear emotion", "Physical illness", "Depression symptom", "None"],
    correctAnswer: "Fear emotion",
  },
  {
    id: 2,
    question: "Which is a mental health warning sign?",
    options: ["Persistent sadness", "Smiling a lot", "Eating chocolate", "Sleeping 8h"],
    correctAnswer: "Persistent sadness",
  },
];

export const getQuestions = (req: Request, res: Response) => {
    res.json(questions);
};

export const getQuestionById = (req: Request, res: Response) => {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    const question = questions.find((q) => q.id === id);
    if (!question) return res.status(404).json({ message: "Question not found." });
    res.json(question);
}

export const createQuestion = (req: Request, res: Response) => {
    const { question, options, correctAnswer } = req.body;

    if (!question || !options || !correctAnswer || !Array.isArray(options) || !options.includes(correctAnswer) ){
        return res.status(404).json({ message: "Invalid request body." });
    }

    const newQuestion : Question = {
        id: questions.length ? questions[questions.length - 1].id + 1 : 1,
        question,
        options,
        correctAnswer,
    }

    questions.push(newQuestion);

    res.status(201).json(newQuestion);
}

export const updateQuestion = (req: Request, res: Response) => {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    const questionToUpdate = questions.find(q => q.id === id);

    if (!questionToUpdate) return res.status(404).json({ message: "Question not found." });

    const { question, options, correctAnswer } = req.body;

    if (question) questionToUpdate.question = question;
    if (options && Array.isArray(options)) questionToUpdate.options = options;
    if (correctAnswer && options?.includes(correctAnswer)) questionToUpdate.correctAnswer = correctAnswer;

    res.json(questionToUpdate);
}

export const deleteQuestion = (req: Request, res: Response) => {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);

    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return res.status(404).json({ message: "Question not found. "});

    const deletedQuestion = questions.splice(index, 1)[0];
    res.json({ message: "Question deleted.", deletedQuestion});
}