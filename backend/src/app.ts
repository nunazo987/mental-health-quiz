import express from "express";
import cors from "cors";
import questionsRoutes from "./routes/questionsRoutes.js";
import authRoutes from './routes/authRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';
const app = express();

app.use(cors({
    origin: [
        'http://localhost:4200',
        'https://mental-health-quiz-nunazo987s.vercel.app/'
    ]
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/results', resultsRoutes);


app.get("/", (req, res) => {
    res.send("API is running.");
});

app.use("/questions", questionsRoutes);

export default app;