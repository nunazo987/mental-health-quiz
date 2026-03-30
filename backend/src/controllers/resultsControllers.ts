import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const createResult = async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    if (!user) { res.status(401).json({ message: 'Unauthorized.' }); return; }
    const { score, total } = req.body;
    if (score === undefined || score === null) {
        res.status(400).json({ message: 'Score is required.' }); return;
    }
    const { data, error } = await supabase
        .from('results')
        .insert([{ user_id: user.id, score, total: total ?? 10 }])
        .select()
        .single();
    if (error) { res.status(500).json({ message: error.message }); return; }
    res.status(201).json(data);
};

export const getMyResults = async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    if (!user) { res.status(401).json({ message: 'Unauthorized.' }); return; }
    const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
    if (error) { res.status(500).json({ message: error.message }); return; }
    res.json(data);
};