import { Request, Response } from "express";
import { supabase } from "../config/supabase.js";

export const register =  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' }); return;
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { res.status(400).json({ message: error.message }); return; }
    res.status(201).json(data);
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' }); return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { res.status(401).json({ message: error.message }); return; }
    res.json(data);
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) { res.status(500).json({ message: error.message }); return; }
    res.status(204).send();
};

