import { useState } from "react";
import { addExpense } from "../api/expenseApi";

export default function ExpenseForm({onAdd}){
    const [form, setForm] = useState({
        title: "",
        subtitle:"",
        category: "",
        amount: ""
    });
    const handleChange=async(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await addExpense({
            ...form,
            amount: Number(form.amount),
        });
        setForm({title: "", subtitle: "", amount: "", category: ""});
        onAdd();
    };

    return(
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required/>
            <br></br>
            <br></br>
            <input name="subtitle" placeholder="Sub-Title" value={form.subtitle} onChange={handleChange} required/>
            <br></br>
            <br></br>
            <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} required />
            <br></br>
            <br></br>
            {/* <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
             */}
            <select name ="category" placeholder="Category" value={form.category} onChange={handleChange} required
            >
                <option value="">Select Category </option>
                <option value ="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value = "Bills">Bills</option>
                <option value ="Others">Others</option>
            </select>
            <br></br>
            <br></br>
            <button>Add Expense</button>
        </form>
    );
}