'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ' ';

  const mov = sort ? movements.slice().sort((a, b) => a - b) : movements;

  mov.forEach(function (value, i) {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row" bis_skin_checked="1">
    <div class="movements__type movements__type--${type}" bis_skin_checked="1">
      ${i + 1} ${type}
    </div>
    <div class="movements__date" bis_skin_checked="1">
      3 days ago
    </div>
    <div class="movements__value" bis_skin_checked="1">
    ${Intl.NumberFormat().format(value)}€
    </div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

function setNames(acc) {
  acc.forEach(function (account) {
    account.sortName = account.owner
      .split(' ')
      .map(value => value[0])
      .join('')
      .toLowerCase();
  });
}

setNames(accounts);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce(function (sum, value) {
    return sum + value;
  }, 0);
  acc.balance = balance;
  const cur = Intl.NumberFormat().format(balance);
  labelBalance.textContent = `${cur}€`;
};

const calcDisplaySummary = function (acc) {
  labelSumIn.textContent = `${acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0)}€`;

  labelSumOut.textContent = `${Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((sum, mov) => sum + mov, 0)
  )}€`;

  labelSumInterest.textContent = `${acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((sum, mov) => sum + mov)}€`;
};

let accStatus;

const updateUI = function (acc) {
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
  displayMovements(acc.movements);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  accStatus = accounts.find(acc => acc?.sortName === inputLoginUsername.value);
  if (Number(inputLoginPin.value) === accStatus.pin) {
    labelWelcome.textContent = `Welcome back, ${accStatus.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    updateUI(accStatus);
  } else {
    console.log('Wrong Pass');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    account => account.sortName === inputTransferTo.value
  );
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    accStatus.balance >= amount &&
    receiverAcc.sortName !== accStatus.sortName
  ) {
    accStatus.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(accStatus);
  } else {
    console.log('Wrong credentials');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';
  if (amount > 0 && accStatus.movements.some(mov => mov >= amount * 0.1)) {
    accStatus.movements.push(amount);
    updateUI(accStatus);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    accStatus.sortName === inputCloseUsername.value &&
    accStatus.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.sortName === accStatus.sortName
    );
    accounts.splice(index, 1);
    console.log(index);
    containerApp.style.opacity = 0;
  } else {
    console.log('Delete failed! Wrong credentials.');
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

let shorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(accStatus.movements, !shorted);
  shorted = !shorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposit = movements.filter(function (mov) {
//   if (mov > 0) {
//     return mov;
//   }
// });

// const withdrawls = movements.filter(function (mov) {
//   if (mov < 0) {
//     return mov;
//   }
// });

// const balace = movements.reduce(function (acc, value) {
//   return acc + value;
// });

// console.log(deposit);
// console.log(withdrawls);
// console.log(balace);

/////////////////////////////////////////////////
// TEST DATA 1: Julia's data [3, 5, 2, 12, 7],
// Kate's data [4, 1, 15, 8, 3]

// TEST DATA 2: Julia's data [9, 16, 6, 8, 3],
// Kate's data [10, 5, 6, 1, 4]

// function checkDogs(dogsJulia, dogsKate) {
//   const newJulia = dogsJulia.slice(1, -2);
//   const bothArray = [...newJulia, ...dogsKate];
//   console.log('-----------');

//   bothArray.forEach(function (value, i) {
//     if (value >= 3) {
//       console.log(
//         `Dog number ${i + 1}, is an adult, and is ${value} years old.`
//       );
//     } else {
//       console.log(`Dog number ${i + 1}, is still a puppy 🐶`);
//     }
//   });
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const calcAverageHumanAge = function (arr) {
//   let dogsArray = arr.map(cell => (cell <= 2 ? 2 * cell : 16 + cell * 4));
//   dogsArray = dogsArray.filter(age => age >= 18);
//   let ageAverage = dogsArray.reduce((sum, cell) => sum + cell);
//   return ageAverage / dogsArray.length;
// };

// const calcAverageHumanAge2 = arr =>
//   arr
//     .map(cell => (cell <= 2 ? 2 * cell : 16 + cell * 4))
//     .filter(age => age >= 18)
//     .reduce((sum, cell, i, arr) => sum + cell / arr.length, 0);

// const arr1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const arr2 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
//  const arr2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log('Average Age ' + arr1);
// console.log('Average Age ' + arr2);
//  console.log(arr2);
// new Array();
// const x = Array.from({ length: 100 }, () => Math.floor(Math.random() * 6) + 1);

// console.log(x);
