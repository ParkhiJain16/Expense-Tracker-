import { useEffect, useState } from "react";
import { fetchExpenses, deleteExpense } from "../api/expenseApi";

export default function ExpenseList({ reload, category }) {
    const [expenses, setExpenses] = useState([]);
    // useEffect(() => {
    //     if (!category) return;
    //     loadExpenses();
    // }, [reload, category]);

    const loadExpenses = async () => {
        // if(!category) return;
        const res = await fetchExpenses(category);
        setExpenses(res.data);
    };

    useEffect(() => {
        if (!category) return;
        loadExpenses();
    }, [reload, category]);

    const handleDelete = async (id) => {
        console.log("Deleting:", id);
        await deleteExpense(id);
        onReload();
        // loadExpenses();
    };

    if (!category) {
        return null;
    }
    if (expenses.length === 0) {
        return (
            <h2 style={{ marginTop: "220px", color: "black" }}>
                No Expenses Found For This Category!
            </h2>
        );
    }


    return (
        <ul>
            {expenses.map((e) => (
                <li
                    key={e._id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "10px 0"
                    }}
                >
                        {/* Left content */}
                    <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
                        <span style={{ fontWeight: "800" }}>
                            {e.title} – ₹{e.amount}
                        </span>

                        {e.subtitle && (
                            <span style={{ fontSize: "13px", color: "black", fontWeight: "600" }}>
                                {e.subtitle}
                            </span>
                        )}
                    </div>

                        {/* Delete button */}
                    <button
                        onClick={() => handleDelete(e._id)}
                        style={{
                            marginLeft: "20px",
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            fontSize: "16px"
                        }}
                    >
                        ❌
                    </button>
                </li>
            ))}
        </ul>
    );
}
