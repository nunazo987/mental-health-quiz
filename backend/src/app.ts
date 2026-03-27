import express from "express";
import cors from "cors";
import questionsRoutes from "./routes/questionsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running.");
});

app.use("/questions", questionsRoutes);

export default app;