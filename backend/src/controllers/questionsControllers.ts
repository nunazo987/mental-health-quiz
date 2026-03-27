import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await supabase.from('questions').select('*');
    if (error) { res.status(500).json({ message: error.message }); return; }
    res.json(data);   
};

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    const { data, error } = await supabase.from('questions').select('*').eq('id', id).single();
    if (error) { res.status(404).json({ message: "Question not found." }); return; }
    res.json(data);
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    const { question, options, correctAnswer } = req.body;
    if (!question || !options || !correctAnswer || !Array.isArray(options) || !options.includes(correctAnswer)){
        res.status(400).json({ message: 'Invalid request body.' }); return;
  }
    const { data, error } = await supabase
    .from('questions')
    .insert([{ question, options, 'correct_answer' : correctAnswer }])
    .select()
    .single();
    if (error) { res.status(500).json({ message: error.message }); return; }
    res.status(201).json(data);
}

export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    const { question, options, correctAnswer } = req.body;
    const updates: Record<string, unknown> = {};

    if (question) updates.question = question;
    if (options && Array.isArray(options)) updates.options = options;
    if (correctAnswer) updates['correct_answer'] = correctAnswer;

    const { data, error } = await supabase
    .from('questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

    if (error) { res.status(404).json({ message: error.message }); return; }
    res.json(data);
}

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    const idParam = req.params.id;
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id)
    .select()
    .single();

    if (error) { res.status(404).json({ message: error.message }); return; }
    res.status(204).send();
};


