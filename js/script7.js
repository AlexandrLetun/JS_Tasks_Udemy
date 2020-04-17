'use strict';

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('.budget-value')[0],    
    dayBudgetValue = document.getElementsByClassName('.daybudget-value')[0],
    levelValue = document.getElementsByClassName('.level-value')[0],
    expValue = document.getElementsByClassName('.expenses-value')[0],
    optExpValue = document.getElementsByClassName('.optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('.income-value')[0],
    monthSavValue = document.getElementsByClassName('.monthsavings-value')[0],
    yearSavValue = document.getElementsByClassName('.yearsavings-value')[0],

    expItem = document.getElementsByClassName('.expenses-item'),
    expBtn = document.getElementsByTagName('button')[0],
    optExpBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optExpItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeLabel = document.querySelector('.choose-income-label'),
    checkSavings = document.querySelector('.checksavings'),
    sum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;
    
function start() {
    money = +prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
    time = prompt("Введите дату в формате", "YYYY-MM-DD");
    
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
    }
}

start();
    
    let appData = {
        budget: money,
        timeData: time,
        expenses : {},
        optionalExpenses:{},
        income : [],
        savings: true,
        chooseExpenses: function() { 
            for (let i=0; i < 2; i++) {
                let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
                    b = prompt("Во сколько обойдется?", "(в грн)");                                            
                if ( (typeof(a)) === 'string' && (typeof(a)) != null &&  (typeof(b)) != null && a != '' && b != '' && a.length < 50 ) {

                     console.log('well done!');
                     
                     appData.expenses[a] = b;
                } else {
                    console.log('false!');
                    i--;
                }   
            }
        },
        detectDayBudget: function() {
            appData.moneyPerDay = (appData.budget/30).toFixed();
            alert("Everyday budget: " + appData.moneyPerDay);
        },
        detectLevel: function() {
            if (appData.moneyPerDay < 250) {
                console.log("Minimum level of wealth");
            } else if(appData.moneyPerDay >= 250 && appData.moneyPerDay < 700) {
                console.log("Average level of wealth");
            } else if(appData.moneyPerDay >= 700 && appData.moneyPerDay < 2000 ){
                console.log("Upper Average level of wealth");
            } else if(appData.moneyPerDay >= 2000 && appData.moneyPerDay < 10000){
                console.log("High level of wealth");
            } else if (appData.moneyPerDay >= 10000) {
                console.log("Very high level of wealth");
            } else {
                console.log('Something gone wrong!:( Try again!:)')
            }
        },
        checkSavings: function() {
            if (appData.savings == true) {
                let save = +prompt("Какова сумма накоплений?"),
                    percent = +prompt("Под какой процент?");
                appData.monthIncome = save/100/12*percent;
                alert("Доход в месяц с вашого депозита: " + appData.monthIncome);
            }
        },
        chooseOptExpenses: function() {
            for (let i=1; i<=3; i++){
                let a1 = prompt("Статья необьязательных расходов?", "");
                appData.optionalExpenses[i] = a1;  
            }
        },
    
        chooseIncome: function() {
            for(let i=1; i<2; i++) {
                let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
    
                if ( (typeof(items)) === 'string' && (typeof(items)) != null && items != '') {
                    appData.income = items.split(', ');
                    appData.income.push(prompt('Может что-то еще?', ''));
                    appData.income.sort(); 
                } else {
                    alert('Введите еще раз!');
                    i--;
                }
            }
                // DZ 2. forEach income (должно начинатся с 1)
            let i =1;
            appData.income.forEach(function(item, a){
                    alert("Способы доп. заработка: " + i + ": " + item);
                    i++;
            });   
        }
    };

    console.log('Наша программа включает в себя такие данные: ');
    for (let key in appData) {
        console.log(key + appData[key]);
    }
    