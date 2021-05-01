class Expense extends BudgetInfo {

    static expenseCounter = 0;

    constructor (description, value, date) {
        super (description, value, date);
        this._id = ++Expense.expenseCounter;
    }
    get id () {
        return this._id;
    }
}