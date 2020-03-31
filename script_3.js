'use strict';


//1.2 Обьявляем переменные ГЛОБАЛЬНО. Так как в ф-ции будет локальное обьявление(будут активны только внутри ф-ции)

let money, time;

//1.1 Пишем money, time с помощью function;

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
    savings: true
};

function chooseExpenses() {
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
}
chooseExpenses();

//DZ
function detectDayBudget() {
    appData.moneyPerDay = (appData.budget/30).toFixed();
    alert("Everyday budget: " + appData.moneyPerDay);
}
detectDayBudget();

function detectLevel() {
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
}
detectLevel();


//1.2 Пишем новую ф-цию "Для расчета накопления с депозита"(если он есть)
function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt("Какова сумма накоплений?"),
            percent = +prompt("Под какой процент?");
        
        appData.monthIncome = save/100/12*percent;
        alert("Доход в месяц с вашого депозита: " + appData.monthIncome);
    }
}
checkSavings();

//DZ
function chooseOptExpenses() {
    for (let i=1; i<=3; i++){
        let a1 = prompt("Статья необьязательных расходов?", "");
        appData.optionalExpenses[i] = a1;  
    }
}
chooseOptExpenses();