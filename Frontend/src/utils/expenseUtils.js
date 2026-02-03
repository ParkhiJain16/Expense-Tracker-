

// export const getCategoryTotals = (expenses) => {
//     const total = {};

//     expenses.forEach((e) => {
//         if (!total[e.category]) {
//             total[e.category] = 0;
//         }
//         total[e.category] += e.amount;
//     });

//     return total;
// };

// // 1️⃣ Calculate monthly budget
// export const getMonthlyBudget = (annualBudget) => {
//     if (!annualBudget) return 0;
//     return annualBudget / 12;
// };

// // 2️⃣ Group expenses by month
// // export const getMonthlySpent = (expenses) => {
// //     const monthly = {};

// //     expenses.forEach((e) => {
// //         const date = new Date(e.date);
// //         const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

// //         if (!monthly[key]) {
// //             monthly[key] = 0;
// //         }
// //         monthly[key] += e.amount;
// //     });

// //     return monthly;
// // };
// export const getMonthlySpent = (expenses, year, month) => {
//     let total = 0;

//     expenses.forEach((e) => {
//         if (!e.date) return;

//         const date = new Date(e.date);
//         if (isNaN(date)) return;

//         if (
//             date.getFullYear() === year &&
//             date.getMonth() === month
//         ) {
//             total += e.amount;
//         }
//     });

//     return total;
// };
// export const getTotalLeft = (monthlyBudget, currentMonthSpent)=>{
//     if(!monthlyBudget) return 0;
//     return monthlyBudget-currentMonthSpent;
// }
// // 3️⃣ Budget status for a month
// export const getMonthlyBudgetStatus = (spent, monthlyBudget) => {
//     if (spent > monthlyBudget) {
//         return "🔴 Over budget";
//     }
//     if (spent > monthlyBudget * 0.8) {
//         return "🟡 Near limit";
//     }
//     return "🟢 Under control";
// };

// 1️⃣ Monthly budget from annual income
export const getMonthlyBudget = (annualBudget) => {
    if (!annualBudget) return 0;
    return annualBudget / 12;
};

// 2️⃣ Monthly total spent (current month ONLY)
export const getMonthlySpent = (expenses, year, month) => {
    let total = 0;

    expenses.forEach((e) => {
        if (!e.date) return;

        const date = new Date(e.date);
        if (isNaN(date)) return;

        if (
            date.getFullYear() === year &&
            date.getMonth() === month
        ) {
            total += e.amount;
        }
    });

    return total;
};

// 3️⃣ Category-wise totals (current month ONLY)
export const getMonthlyCategoryTotals = (expenses, year, month) => {
    const totals = {};

    expenses.forEach((e) => {
        if (!e.date) return;

        const date = new Date(e.date);
        if (isNaN(date)) return;

        if (
            date.getFullYear() === year &&
            date.getMonth() === month
        ) {
            if (!totals[e.category]) {
                totals[e.category] = 0;
            }
            totals[e.category] += e.amount;
        }
    });

    return totals;
};

// 4️⃣ Total left for current month
export const getTotalLeft = (monthlyBudget, monthlySpent) => {
    if (!monthlyBudget) return 0;
    return monthlyBudget - monthlySpent;
};

// 5️⃣ Monthly budget status
export const getMonthlyBudgetStatus = (spent, monthlyBudget) => {
    if (spent > monthlyBudget) {
        return "🔴 Over budget";
    }
    if (spent > monthlyBudget * 0.8) {
        return "🟡 Near limit";
    }
    return "🟢 Under control";
};
