"use strict";

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////

const accounts = [
  {
    owner: "Mehedi Hasan",
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1234,
    movementsDates: [
      "2021-11-18T21:31:17.178Z",
      "2021-12-23T07:42:02.383Z",
      "2022-01-28T09:15:04.904Z",
      "2022-04-01T10:17:24.185Z",
      "2022-07-08T14:11:59.604Z",
      "2022-09-10T17:01:17.194Z",
      "2022-09-12T23:36:17.929Z",
      "2022-09-20T12:51:31.398Z",
      "2022-09-28T06:41:26.190Z",
      "2022-09-29T08:11:36.678Z",
    ],
    currency: "USD",
    locale: "en-US",
  },
  {
    owner: "Abir Tasrif",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 4321,
    movementsDates: [
      "2021-12-11T21:31:17.671Z",
      "2021-12-27T07:42:02.184Z",
      "2022-01-05T09:15:04.805Z",
      "2022-02-14T10:17:24.687Z",
      "2022-03-12T14:11:59.203Z",
      "2022-05-16T17:01:17.392Z",
      "2022-08-10T23:36:17.522Z",
      "2022-09-03T12:51:31.491Z",
      "2022-09-18T06:41:26.394Z",
      "2022-09-21T08:11:36.276Z",
    ],
    currency: "EUR",
    locale: "en-GB",
  },
  {
    owner: "Louise Lucas",
    movements: [2500, 1400, -1150, -1790, -210, -800, 9500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 1234,
    movementsDates: [
      "2021-12-11T21:31:17.671Z",
      "2021-12-27T07:42:02.184Z",
      "2022-01-05T09:15:04.805Z",
      "2022-02-14T10:17:24.687Z",
      "2022-03-12T14:11:59.203Z",
      "2022-05-16T17:01:17.392Z",
      "2022-08-10T23:36:17.522Z",
      "2022-09-03T12:51:31.491Z",
      "2022-09-18T06:41:26.394Z",
      "2022-09-21T08:11:36.276Z",
    ],
    currency: "EUR",
    locale: "fr-FR",
  },
  {
    owner: "Babel Mahmud",
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1234,
    movementsDates: [
      "2021-11-18T21:31:17.178Z",
      "2021-12-23T07:42:02.383Z",
      "2022-01-28T09:15:04.904Z",
      "2022-04-01T10:17:24.185Z",
      "2022-07-08T14:11:59.604Z",
      "2022-09-10T17:01:17.194Z",
      "2022-09-12T23:36:17.929Z",
      "2022-09-15T12:51:31.398Z",
      "2022-09-19T06:41:26.190Z",
      "2022-09-21T08:11:36.678Z",
    ],
    currency: "BDT",
    locale: "bn-BD",
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
// Formatting Currency
/////////////////////////////////////////////////////////////////////

function formattingCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

/////////////////////////////////////////////////////////////////////
// Day Calculation
/////////////////////////////////////////////////////////////////////

function formatMoveDate(date, locale) {
  const calculateDays = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calculateDays(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
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

let currentAccount, timer;

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    setTimeout(() => {
      //Display welcome & UI
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner
        .split(" ")
        .at(0)}`;
      containerApp.style.opacity = 1;

      //display current date & time
      const now = new Date();

      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);

      // log out timer
      if (timer) clearInterval(timer);
      timer = logOut();

      //update UI
      updateUI(currentAccount);
    }, 1000);
  } else {
    setTimeout(() => {
      //hide UI & show warning
      labelWelcome.textContent = `Access Denied`;
      containerApp.style.opacity = 0;
    }, 1000);
  }

  //clear field
  inputLoginUsername.value = inputLoginPassword.value = "";
  inputLoginPassword.blur();
});

/////////////////////////////////////////////////////////////////////
// Movements
/////////////////////////////////////////////////////////////////////
function displayMovements(account, sort = false) {
  containerMovements.innerHTML = "";

  const moves = sort
    ? account.movements.slice(0).sort((a, b) => a - b)
    : account.movements;

  moves.forEach((move, i) => {
    const type = move > 0 ? "deposit" : "withdrawal";
    const formattedMove = formattingCurrency(
      move,
      currentAccount.locale,
      currentAccount.currency
    );

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMoveDate(date, account.locale);

    const html = `<div class="movements-row">
    <div class="movements-type movements-type-${type}">${i + 1} ${type}</div>
    <div class="movements-date">${displayDate}</div>
    <div class="movements-value">${formattedMove}</div>
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
  labelSumIn.textContent = formattingCurrency(
    incomes,
    account.locale,
    account.currency
  );
  //Outgoing
  const outcomes = account.movements
    .filter((move) => move < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);
  labelSumOut.textContent = formattingCurrency(
    Math.abs(outcomes),
    account.locale,
    account.currency
  );
  //Interest
  const interest = account.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = formattingCurrency(
    interest,
    account.locale,
    account.currency
  );
}
//called in 'Login' area

/////////////////////////////////////////////////////////////////////
// Balance
/////////////////////////////////////////////////////////////////////

function displayBalance(account) {
  account.balance = account.movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = formattingCurrency(
    account.balance,
    account.locale,
    account.currency
  );
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
    setTimeout(() => {
      //Transfer Money
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);

      //Add current date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAccount.movementsDates.push(new Date().toISOString());

      //Update UI
      updateUI(currentAccount);
      //Success  notification
      labelWelcome.textContent = "Transaction Successfull";
    }, 1000);
    // log out timer
    if (timer) clearInterval(timer);
    timer = logOut();
  } else {
    setTimeout(() => {
      labelWelcome.textContent = "Transaction Failed";
    }, 1000);
    // log out timer
    if (timer) clearInterval(timer);
    timer = logOut();
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
    setTimeout(() => {
      //adding +ve movement to current account
      currentAccount.movements.push(amount);
      //Add current time
      currentAccount.movementsDates.push(new Date().toISOString());
      // log out timer
      if (timer) clearInterval(timer);
      timer = logOut();
      //UI update
      updateUI(currentAccount);
      //message
      labelWelcome.textContent = `Loan Successful !`;
    }, 1000);
  } else {
    setTimeout(() => {
      labelWelcome.textContent = `You are not eligible for loan !`;
    }, 1000);
    // log out timer
    if (timer) clearInterval(timer);
    timer = logOut();
  }
  //clear field
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

/////////////////////////////////////////////////////////////////////
// Close Account
/////////////////////////////////////////////////////////////////////

btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.password === Number(inputClosePassword.value)
  ) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );

    setTimeout(() => {
      //deleting data's
      accounts.splice(index, 1);
      //ui hide
      containerApp.style.opacity = 0;
      //message
      labelWelcome.textContent = "Account Deleted !";
    }, 1000);
    // log out timer
    if (timer) clearInterval(timer);
    timer = logOut();
  } else {
    setTimeout(() => {
      labelWelcome.textContent = "Can't be deleted !";
    }, 1000);
    // log out timer
    if (timer) clearInterval(timer);
    timer = logOut();
  }

  //clear fields
  inputCloseUsername.value = inputClosePassword.value = "";
  inputClosePassword.blur();
});

/////////////////////////////////////////////////////////////////////
// Sorting
/////////////////////////////////////////////////////////////////////

let sortedMove = false;

btnSort.addEventListener("click", function (event) {
  event.preventDefault();

  displayMovements(currentAccount, !sortedMove);
  sortedMove = !sortedMove;
});

/////////////////////////////////////////////////////////////////////
// Timer
/////////////////////////////////////////////////////////////////////

function logOut() {
  labelTimer.textContent = "";

  let time = 120;

  const clock = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "You've been logged out !";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  clock();

  timer = setInterval(clock, 1000);

  return timer;
}
