import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/Expense.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Expense Tracking Application");
});

app.use("/expenses", expenseRoutes);

app.use(errorHandler);
export default app;