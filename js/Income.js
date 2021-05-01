class Income extends BudgetInfo {

    static incomeCounter = 0;

    constructor (description, value, date) {
        super (description, value, date);
        this._id = ++Income.incomeCounter;
    }
    get id () {
        return this._id;
    }
}