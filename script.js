"use strict";

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////

const accounts = [
  {
    owner: "Abir Tasrif",
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1234,
    // movementsDates: [
    //   "2021-11-18T21:31:17.178Z",
    //   "2021-12-23T07:42:02.383Z",
    //   "2022-01-28T09:15:04.904Z",
    //   "2022-04-01T10:17:24.185Z",
    //   "2022-07-08T14:11:59.604Z",
    //   "2022-09-10T17:01:17.194Z",
    //   "2022-09-12T23:36:17.929Z",
    //   "2022-09-15T12:51:31.398Z",
    //   "2022-09-19T06:41:26.190Z",
    //   "2022-09-21T08:11:36.678Z",
    // ],
    // currency: "USD",
    // locale: "en-US",
  },
  {
    owner: "Mehedi Hasan",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 5678,
    // movementsDates: [
    //   "2021-12-11T21:31:17.671Z",
    //   "2021-12-27T07:42:02.184Z",
    //   "2022-01-05T09:15:04.805Z",
    //   "2022-02-14T10:17:24.687Z",
    //   "2022-03-12T14:11:59.203Z",
    //   "2022-05-16T17:01:17.392Z",
    //   "2022-08-10T23:36:17.522Z",
    //   "2022-09-03T12:51:31.491Z",
    //   "2022-09-18T06:41:26.394Z",
    //   "2022-09-21T08:11:36.276Z",
    // ],
    // currency: "EUR",
    // locale: "en-GB",
  },
];

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn-transfer");
const btnLoan = document.querySelector(".form-btn-loan");
const btnClose = document.querySelector(".form-btn-close");
const btnSort = document.querySelector(".btn-sort");

const inputLoginUsername = document.querySelector(".login-input-username");
const inputLoginPassword = document.querySelector(".login-input-password");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputLoanAmount = document.querySelector(".form-input-loan-amount");
const inputCloseUsername = document.querySelector(".form-input-username");
const inputClosePassword = document.querySelector(".form-input-password");

/////////////////////////////////////////////////////////////////////
// Update UI
/////////////////////////////////////////////////////////////////////
function updateUI(currentAccount) {
  displaySummary(currentAccount);
  displayMovements(currentAccount);
  displayBalance(currentAccount);
}

/////////////////////////////////////////////////////////////////////
// Username
/////////////////////////////////////////////////////////////////////

function createUsernames(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word.at(0))
      .join("");
  });
}
createUsernames(accounts);

/////////////////////////////////////////////////////////////////////
// Login
/////////////////////////////////////////////////////////////////////

let currentAccount;
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    //Display welcome & UI
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(" ")
      .at(0)}`;
    containerApp.style.opacity = 1;

    //update UI
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent = `Access Denied`;
    containerApp.style.opacity = 0;
  }

  //clear field
  inputLoginUsername.value = inputLoginPassword.value = "";
  inputLoginPassword.blur();
});

/////////////////////////////////////////////////////////////////////
// Movements
/////////////////////////////////////////////////////////////////////
function displayMovements(account) {
  containerMovements.innerHTML = "";
  const moves = account.movements;
  moves.forEach((move, i) => {
    const type = move > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements-row">
    <div class="movements-type movements-type-${type}">${i + 1} ${type}</div>
    <div class="movements-date">5 days ago</div>
    <div class="movements-value">${move}$</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
//called in 'Login' area

/////////////////////////////////////////////////////////////////////
// Summary
/////////////////////////////////////////////////////////////////////
function displaySummary(account) {
  //Income
  const incomes = account.movements
    .filter((move) => move > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumIn.textContent = `${incomes}$`;
  //Outgoing
  const outcomes = account.movements
    .filter((move) => move < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}$`;
  //Interest
  const interest = account.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest}$`;
}
//called in 'Login' area

/////////////////////////////////////////////////////////////////////
// Balance
/////////////////////////////////////////////////////////////////////

function displayBalance(account) {
  account.balance = account.movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = `${account.balance}$`;
}
//called in 'Login' area

/////////////////////////////////////////////////////////////////////
// Transfer
/////////////////////////////////////////////////////////////////////
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  const amount = Number(inputTransferAmount.value);
  //clearing field
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAccount.username !== currentAccount.username &&
    receiverAccount
  ) {
    //Transfer Money
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
    //Succes  notification
    labelWelcome.textContent = "Transaction Successfull";
  } else {
    labelWelcome.textContent = "Transaction Failed";
  }
});

/////////////////////////////////////////////////////////////////////
// Loan
/////////////////////////////////////////////////////////////////////
btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((move) => move >= amount * 0.1)
  ) {
    //adding +ve movement to current account
    currentAccount.movements.push(amount);
    //UI update
    updateUI(currentAccount);
    //message
    labelWelcome.textContent = `Loan Successful !`;
  } else {
    labelWelcome.textContent = `You are not eligible for loan !`;
  }
  //clear field
  inputLoanAmount = "";
  inputLoanAmount.blur();
});
/////////////////////////////////////////////////////////////////////
// Close Account
/////////////////////////////////////////////////////////////////////
btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.password === inputClosePassword.value
  ) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );

    //deleting data's
    accounts.splice(index, 1);
    //message
    labelWelcome.textContent = "Account Deleted !";
  } else {
    labelWelcome.textContent = "Can't be deleted !";
  }

  //clear fields
  inputCloseUsername.value = inputClosePassword.value = "";
  inputClosePassword.blur();
});
