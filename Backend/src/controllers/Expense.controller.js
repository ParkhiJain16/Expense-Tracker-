import Expense from "../models/Expense.js";

export const getExpenses = async(req,res,next)=>{
    try{
        const {category} = req.query;
        const filter = {};
        if(category){
            filter.category = category;
        }
        const expenses = await Expense.find(filter).sort({date:-1});
        res.status(200).json(expenses);

    }catch(error){
        next(error);
    }
};

export const createExpense = async(req,res,next)=>{
    try{
        const {title, subtitle, amount, category, date} = req.body;
        if (!title || !subtitle || !amount || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const expense = await Expense.create({
            title,
            subtitle,
            amount,
            category,
            date: date || Date.now(),
        });
        res.status(201).json(expense);
    }catch(error){
        next(error);
    }
};

export const deleteExpense = async(req,res,next)=>{
    try{
        console.log("DELETE ID:", req.params.id);
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if(!expense){
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted" });
    }catch(error){
        next(error);
    }
};
