import { getMonthlyCategoryTotals } from "../../utils/expenseUtils";

export default function MonthlyCategorySummary({expenses}){
    const data = getMonthlyCategoryTotals(expenses);

    return(
        <div>
            {/* render monthly category totals */}
        </div>
    );
}