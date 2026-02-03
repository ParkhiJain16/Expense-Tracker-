// import { useEffect, useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import { fetchExpenses } from "./api/expenseApi";
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// import CategoryCards from './components/CategoryCards';

// import {
//   getCategoryTotals,
//   getMonthlyBudget,
//   getMonthlySpent,
//   getTotalLeft,
//   getMonthlyBudgetStatus
// } from "./utils/expenseUtils";


// function App() {
//   const [expenses, setExpenses] = useState([]);
//   const [reload, setReload] = useState(false);
//   const [selectedcategory, setSelectedCategory] = useState(null);
//   const [annualIncome, setAnnualIncome] = useState(()=>{
//     const saved = localStorage.getItem("annualIncome");
//     return saved? Number(saved): "";
//   });

//   useEffect(()=>{
//     if(annualIncome !== ""){
//       localStorage.setItem("annualIncome", annualIncome);
//     }
//   },[annualIncome]);
//   useEffect(()=>{
//     fetchExpenses().then(res=>setExpenses(res.data));

//   },[reload]);

//   const monthlyBudget = getMonthlyBudget(annualIncome);
//   const categoryTotals = getCategoryTotals(expenses);

//   const now = new Date();
//   const currentMonthSpent = getMonthlySpent(
//     expenses,
//     now.getFullYear(),
//     now.getMonth()
//   );
//   const totalLeft = getTotalLeft(monthlyBudget,currentMonthSpent);
//   const monthlyStatus= getMonthlyBudgetStatus(
//     currentMonthSpent,
//     monthlyBudget
//   );

//   // return (
//   //   <>
//   //     <h1>Expense Tracker</h1>
//   //     <div style={{ textAlign: "right", marginBottom: "10px" }}>
//   //       <input
//   //         type="number"
//   //         placeholder="Set Annual Income"
//   //         value={annualIncome}
//   //         onChange={(e) => setAnnualIncome(Number(e.target.value))}
//   //       />
//   //     </div>

//   //     {/* Total Spent + Status */}
//   //     <h3>Monthly Budget: ₹{monthlyBudget.toFixed(0)}</h3>
//   //     <h3>This Month Spent: ₹{currentMonthSpent}</h3>

//   //     <h3>Total Left This Month: ₹{(totalLeft).toFixed(2)}</h3>
//   //     {annualIncome && <p>{monthlyStatus}</p>}


//   //     <hr />

//   //     <CategoryCards onSelect={setSelectedCategory} totals={categoryTotals}/>
//   //     {selectedcategory && (
//   //       <button
//   //       onClick={()=>setSelectedCategory(null)}
//   //       style={{marginTop:"10px"}}
//   //       >
//   //         ← Back To Categories
//   //       </button>
//   //     )}
//   //     {!selectedcategory && (
//   //       <ExpenseForm onAdd={()=> setReload(!reload)} /> 
//   //     )}
//   //     <ExpenseList 
//   //       reload={reload}
//   //       category={selectedcategory} 
//   //     />
//   //   </>
//   // );
//   return (
//     <div className="page">
//       <div className="app-container">
  
//         <h1 className="app-title">💸 Expense Tracker</h1>
  
//         <div className="income-box">
//           <input
//             type="number"
//             placeholder="Set Annual Income"
//             value={annualIncome}
//             onChange={(e) => setAnnualIncome(Number(e.target.value))}
//           />
//         </div>
  
//         <div className="stats">
//           <div className="stat-card">
//             <span>Monthly Budget</span>
//             <strong>₹{monthlyBudget.toFixed(0)}</strong>
//           </div>
//           <div className="stat-card">
//             <span>Spent This Month</span>
//             <strong>₹{currentMonthSpent}</strong>
//           </div>
//           <div className="stat-card">
//             <span>Left</span>
//             <strong>₹{totalLeft.toFixed(2)}</strong>
//           </div>
//         </div>
  
//         {annualIncome && <p className="status">{monthlyStatus}</p>}
  
//         <CategoryCards onSelect={setSelectedCategory} totals={categoryTotals} />
  
//         {selectedcategory && (
//           <button className="back-btn" onClick={() => setSelectedCategory(null)}>
//             ← Back To Categories
//           </button>
//         )}
  
//         {!selectedcategory && <ExpenseForm onAdd={() => setReload(!reload)} />}
  
//         <ExpenseList reload={reload} category={selectedcategory} />
  
//       </div>
//     </div>
//   );
  
// }

// export default App;
import { useEffect, useState } from "react";
import "./App.css";
import { fetchExpenses } from "./api/expenseApi";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategoryCards from "./components/CategoryCards";

import {
  getMonthlyBudget,
  getMonthlySpent,
  getMonthlyCategoryTotals,
  getTotalLeft,
  getMonthlyBudgetStatus
} from "./utils/expenseUtils";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(() => {
    const saved = localStorage.getItem("annualIncome");
    return saved ? Number(saved) : "";
  });

  // Persist annual income
  useEffect(() => {
    if (annualIncome !== "") {
      localStorage.setItem("annualIncome", annualIncome);
    }
  }, [annualIncome]);

  // Fetch expenses
  useEffect(() => {
    fetchExpenses().then((res) => setExpenses(res.data));
  }, [reload]);

  useEffect(() => {
    console.table(
      expenses.map(e => ({
        title: e.title,
        amount: e.amount,
        category: e.category,
        date: e.date
      }))
    );
  }, [expenses]);
  
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthlyBudget = getMonthlyBudget(annualIncome);
  const monthlySpent = getMonthlySpent(expenses, year, month);
  const categoryTotals = getMonthlyCategoryTotals(expenses, year, month);
  const totalLeft = getTotalLeft(monthlyBudget, monthlySpent);
  const monthlyStatus = getMonthlyBudgetStatus(
    monthlySpent,
    monthlyBudget
  );

  return (
    <div className="page">
      <div className="app-container">

        <h1 className="app-title">💸 Expense Tracker</h1>

        <div className="income-box">
          <input
            type="number"
            placeholder="Set Annual Income"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
          />
        </div>

        <div className="stats">
          <div className="stat-card">
            <span>Monthly Budget</span>
            <strong>₹{monthlyBudget.toFixed(0)}</strong>
          </div>
          <div className="stat-card">
            <span>Spent This Month</span>
            <strong>₹{monthlySpent}</strong>
          </div>
          <div className="stat-card">
            <span>Left</span>
            <strong>₹{Math.max(totalLeft, 0).toFixed(2)}</strong>
          </div>
        </div>

        {annualIncome && <p className="status">{monthlyStatus}</p>}

        <CategoryCards
          onSelect={setSelectedCategory}
          totals={categoryTotals}
        />

        {selectedCategory && (
          <button
            className="back-btn"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back To Categories
          </button>
        )}

        {!selectedCategory && (
          <ExpenseForm onAdd={() => setReload(!reload)} />
        )}

        <ExpenseList reload={reload} onReload={() => setReload(!reload)} category={selectedCategory} />

      </div>
    </div>
  );
}

export default App;
