class BudgetInfo {

    constructor(description, value, date) {
        this._description = description;
        this._value = value;
        this._date = date;
    }
    get description () {
        return this._description;
    }
    set description (description) {
        this._description = description;
    }
    get value () {
        return this._value;
    }
    set value (value) {
        this._value = value;
    }
    get date () {
        return this._date;
    }
    set date (date) {
        this._date = date;
    }
}