import axios from "axios";
const API= axios.create({
    baseURL: "http://localhost:5000",
});

export const fetchExpenses = (category)=>
    API.get("/expenses",{
        params: category?{category}:{},
    });

export const addExpense = (data)=>
    API.post("/expenses",data);
export const deleteExpense = (id)=>
    API.delete(`/expenses/${id}`);