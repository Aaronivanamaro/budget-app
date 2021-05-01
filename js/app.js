//List of incomes and expenses by default

const incomes = [
    new Income("Full-time Job", 90000.00, "2021-04-27"),
    new Income("Freelance Job", 20000.00, "2021-04-25"),
    new Income("Trading", 10000.00, "2021-04-24"),
    new Income("Private Lessons", 15000.00, "2021-04-21"),
    new Income("Gold", 20000.00, "2021-04-20")
];

const expenses = [
    new Expense("Rent", 20000.00, "2021-05-01"),
    new Expense("Bitcoin", 30000.00, "2021-04-30"),
    new Expense("Mortgage", 15000.00, "2021-04-25"),
    new Expense("Bills", 12000.00, "2021-04-23"),
    new Expense("Education", 15000.00, "2021-04-15")
];

// Budget Application: load HEADER values

let loadApp = () => {
  loadHeader();
  loadIncome();
  loadExpenses();
}

let totalIncomes = () => {
  let totalIncome = 0;
  for (let income of incomes) {
      totalIncome += income.value;
  } 
  return totalIncome;
}

let totalExpenses = () => {
  let totalExpense = 0;
  for (let expense of expenses) {
      totalExpense += expense.value;
  } 
  return totalExpense;
}

let loadHeader = () => {
  let budget = totalIncomes() - totalExpenses();
  let expensesPercentage = totalExpenses()/totalIncomes();
  document.querySelector(".header-value").innerHTML = moneyFormat(budget);
  document.querySelector(".expenses-percentage").innerHTML = percentageFormat(expensesPercentage);
  document.querySelector(".income-value").innerHTML = moneyFormat(totalIncomes());
  document.querySelector(".expenses-value").innerHTML = moneyFormat(totalExpenses());
}

//Desired FORMATS

const moneyFormat = (value) => {
  return value.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

const percentageFormat = (value) => {
  return value.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

//INCOME: loading section, creating new income and deleting old ones

const loadIncome = () => {
  let incomesHTML = '';
  for (let income of incomes) {
      incomesHTML += createIncomeHTML(income);
  }
  document.querySelector("#list-income").innerHTML = incomesHTML;
}

const createIncomeHTML = (income) => {
  let incomeHTML = `
  <div class="container">
      <div class="description">${income.description}</div>
      <div class="right">
          <div class="value">+ ${moneyFormat(income.value)}</div>
          <div class="date">${income.date}</div>
          <div class="delete">
              <button class="delete-btn">
                  <ion-icon name="close-circle-outline"
                  onclick = "deleteIncome(${income.id})" ></ion-icon>
              </button>
          </div>
      </div>
  </div>
  `;
  return incomeHTML;     
}

const deleteIncome = (id) => {
  let deleteIndex = incomes.findIndex( income => income.id === id);
  incomes.splice(deleteIndex, 1);
  loadHeader();
  loadIncome();
}

//EXPENSES: loading section, creating new expenses and deleting old ones

const loadExpenses = () => {
  let expensesHTML = '';
  for (let expense of expenses) {
      expensesHTML += createExpenseHTML(expense);
  }
  document.querySelector("#list-expenses").innerHTML = expensesHTML;
}

const createExpenseHTML = (expense) => {
  let expenseHTML = `
  <div class="container">
      <div class="description">${expense.description}</div>
      <div class="right">
          <div class="value">- ${moneyFormat(expense.value)}</div>
          <div class="percentage">${percentageFormat(expense.value/totalExpenses())}</div>
          <div class="date">${expense.date}</div>
          <div class="delete">
              <button class="delete-btn">
                  <ion-icon name="close-circle-outline"
                  onclick = "deleteExpense(${expense.id})" ></ion-icon>
              </button>
          </div>
      </div>
  </div>    `;
  return expenseHTML;     
}

const deleteExpense = (id) => {
  let deleteIndex = expenses.findIndex( expense => expense.id === id);
  expenses.splice(deleteIndex, 1);
  loadHeader();
  loadExpenses();
}

//FORM: function to add new input to both income and expenses

let addNewInformation = () => {
  let form = document.forms["form"];
  let type = form["type"];
  let description = form["description"];
  let value = form["value"];
  let date = form["date"];
  
  if (description.value !== "" && value.value !== "" && date.value !== "") {
      if (type.value === "income") {
          incomes.push(new Income(description.value, +value.value, date.value));
          loadHeader();
          loadIncome();
          form.reset();
      }
      else if (type.value === "expenses") {
         expenses.push(new Expense(description.value, +value.value, date.value));
         loadHeader();
         loadExpenses();
         form.reset();
      }
  }
}

// Function to set a given theme

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// Function to toggle between light and dark theme

function toggleTheme() {
    if (localStorage.getItem('theme') === 'night-mode') {
        setTheme('light-mode');
    } else {
        setTheme('night-mode');
    }
}

// Immediately invoked function to set the theme on initial load

(function () {
    if (localStorage.getItem('theme') === 'light-mode') {
        setTheme('light-mode');
    } else {
        setTheme('night-mode');
    }
})();