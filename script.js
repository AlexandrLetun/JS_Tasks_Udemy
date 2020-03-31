'use strict';

//2) 2 переменные получают данные от пользователя
let money = prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
let time = prompt("Введите дату в формате", "YYYY-MM-DD");

//3)создаем обьект appData
let appData = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses:{},
    income : [],
    savings: false
};

//4) Обьект в обьекте appData.expenses; создаем ключ(.toBuy1,2) и помещаем туда его свойство spendMoney1,2
let toBuy1 = prompt("Введите обязательную статью расходов в этом месяце", ""),
    spendMoney1 = prompt("Во сколько обойдется?", "(в грн)"),
    toBuy2 = prompt("Введите обязательную статью расходов в этом месяце", ""), 
    spendMoney2 = prompt("Во сколько обойдется?", "(в грн)");
// appData.expenses.toBuy = spendMoney;   //МОЄ ? не удалось присвоить елементу expenses.toBuy - вводимую фразу ?
appData.expenses[toBuy1]=spendMoney1;     // ! записалось, написав не через крапку(.), а через квадртні дужки: []; все виводить
appData.expenses[toBuy2]=spendMoney2;
console.log(appData.expenses);

//5) В завданні потрібно просто місячну суму, поділити на 30.
alert(appData.budget/30);

//МОЄ
//Считаем бюджет на 1 день. Отнимаем от месяца обьязательную плату и делим на 30.
// let c = (+money - +spendMoney1 - +spendMoney2);
// c=c/30;
// alert("Ваш бюджет на 1 день "+ c +"грн.");

