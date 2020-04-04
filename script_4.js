'use strict';

let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
    time = prompt("Введите дату в формате", "YYYY-MM-DD");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
    }
}
start();

// Методы обьекта - это функции.
// 0.Запишем наши функции, методами в обькте appData;
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
            if ( (typeof(a)) === 'string' && (typeof(a)) != null &&  (typeof(b)) != null
                    && a != '' && b != '' && a.length < 50 ) {             
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
            console.log("Minimum level of wealth")
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

    // DZ 1.Дописать проверку строки
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

        //Udemy Example
        //if (typeof(items) != "string" || items == "" || typeof(items) == null) {
        //     console.log("Вы ввели некорректные данные или не ввели их вовсе");
        // } else {
        //     appData.income = items.split(", ");
        //     appData.income.push(prompt("Может что-то еще?"));
        //     appData.income.sort();
        // }

        // appData.income.forEach (function (itemmassive, i) {
        //     alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
        // });
    }
    
};
// 0.Теперь все ф-ции, которые мы создали ранее, находяться в обьектном виде. В виде методов обьекта appData.

// DZ 3. for in appData
console.log('Наша программа включает в себя такие данные: ');
for (let key in appData) {
    console.log(key + appData[key]);
}
