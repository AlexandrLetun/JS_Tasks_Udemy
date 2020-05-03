'use strict';

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],    
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expValue = document.getElementsByClassName('expenses-value')[0],
    optExpValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavValue = document.getElementsByClassName('yearsavings-value')[0],

    expItem = document.getElementsByClassName('expenses-item'),
    expBtn = document.getElementsByTagName('button')[0],
    optExpBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optExpItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('.checksavings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

let appData = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses:{},
    income : [],
    savings : false
 };



//DZ: 2)Сделать кнопки неактивными, пока не нажмут "Начать расчет" 
// ! *(немного по-другому сделал; пока time & money не будет undefined) !
document.getElementsByTagName('button')[0].setAttribute("disabled", "true");
document.getElementsByTagName('button')[1].setAttribute("disabled", "true");
document.getElementsByTagName('button')[2].setAttribute("disabled", "true");
// * Еща так можно сделать неактивными:
//  document.getElementsByTagName("button")[0].disabled = true; 
//  document.getElementsByTagName("button")[0].disabled = false; 

//1) startBtn (Начать расчет)
startBtn.addEventListener('click', function() {
    time = prompt("Введите дату в формате", "YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
    
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
    }

    //NEW
    //1.1 [записываем в appData]
    appData.budget = money;
    appData.timeData = time;
    //1.2 [записываем в поле budgetValue]
    budgetValue.textContent = money.toFixed();
    //1.2 !!!Когда есть input -> испол. value (а не textContent)
    //1.2
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() +1;
    dayValue.value = new Date(Date.parse(time)).getDay();

    //DZ: 2)Сделать кнопки неактивными, пока не нажмут "Начать расчет" 
    // ! *(немного по-другому сделал; пока time & money не будет undefined) !
    //original: без условия просто " disabled все 3 "
    if (money != undefined && time != undefined) {
        document.getElementsByTagName('button')[0].removeAttribute("disabled");
        document.getElementsByTagName('button')[1].removeAttribute("disabled");
        document.getElementsByTagName('button')[2].removeAttribute("disabled");
    } else {
        document.getElementsByTagName('button')[0].setAttribute("disabled", "true");
        document.getElementsByTagName('button')[1].setAttribute("disabled", "true");
        document.getElementsByTagName('button')[2].setAttribute("disabled", "true");
    }

});

//DZ 3)При "расчете Дневного бюджета" = ("Доход" - "Обьязательные траты")/30
// ! * Создал еще одну переменную, так как не знал как получить число - "Обьязательные траты"
let sumI = 0;

//2. ВВЕДИТЕ ОБЬЯЗАТЕЛЬНЫЕ РАСХОДЫ
expBtn.addEventListener('click', function() {
    let sum = 0;

    //2.2 ВВЕДИТЕ ОБЬЯЗАТЕЛЬНЫЕ РАСХОДЫ
    for (let i=0; i < expItem.length; i++) {
        // let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
        //     b = prompt("Во сколько обойдется?", "(в грн)"); 
        let a = expItem[i].value,  
            b = expItem[++i].value;                                             
        if ( (typeof(a)) === 'string' && (typeof(a)) != null &&  (typeof(b)) != null && a != '' && b != '' && a.length < 50 ) {
             console.log('well done!');
             appData.expenses[a] = b;
             sum += +b;
        } else {
            console.log('false!');
            i--;
        }   
    }
    expValue.textContent = sum;

    //DZ 3) ! * Создал еще одну переменную, так как не знал как получить число - "Обьязательные траты"
    sumI = sum;
});

//3. Введите необязательные расходы
optExpBtn.addEventListener('click', function() {
    for (let i=0; i<=optExpItem.length; i++){
        let a1 =  optExpItem[i].value;
        appData.optionalExpenses[i] = a1;  
        optExpValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

//4. Расчитать
countBtn.addEventListener('click', function(){

    if(appData.budget != undefined) {
        //DZ 3) 
        //original: *можна просто: " +expensesValue.textContent ""
        appData.moneyPerDay = ((appData.budget - sumI) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 250) {
            levelValue.textContent = "Minimum level of wealth";
        } else if(appData.moneyPerDay >= 250 && appData.moneyPerDay < 700) {
            levelValue.textContent = "Average level of wealth";
        } else if(appData.moneyPerDay >= 700 && appData.moneyPerDay < 2000 ){
            levelValue.textContent = "Upper Average level of wealth";
        } else if(appData.moneyPerDay >= 2000 && appData.moneyPerDay < 10000){
            levelValue.textContent = "High level of wealth";    
        } else if (appData.moneyPerDay >= 10000) {
            levelValue.textContent = "Very high level of wealth";
        } else {
            levelValue.textContent = 'Something gone wrong! Try again! :)';
        }
    } else {
        dayBudgetValue.textContent = "Error!";
    }
});

//5.Введите статьи возможного дохода через запятую
incomeItem.addEventListener('input', function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    //5.1 Чтобы сразу появлялись
    incomeValue.textContent = appData.income;
});

//6.1 Есть ли накопления
checkSavings.addEventListener('click', function() {
    if(appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }

});

//6.2 Сумма
sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavValue.textContent = appData.monthIncome.toFixed(1);
        yearSavValue.textContent = appData.yearIncome.toFixed(1);
    }
});

//6.3 Процент
percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
        percent = +percentValue.value;
    
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavValue.textContent = appData.monthIncome.toFixed(1);
        yearSavValue.textContent = appData.yearIncome.toFixed(1);
    }
});

