'use strict';

let money = +prompt("Ваш бюджет на месяц?", "Сумма(в грн)");
let time = prompt("Введите дату в формате", "YYYY-MM-DD");

let appData = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses:{},
    income : [],
    savings: false
};

                                                            //checking if 'a' is a STRING; not nessesary; (because prompt returns STRING);
                                                                    //&& (!= null) if customer click "CANCEL" 
                                                                    //&& (!= '') if customer leaves emtpy space
                                                                    //&& (length < 50) for not to long sentences
// Перероблємо попереднє д/з з циклом for
for (let i=0; i < 2; i++) {
    let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
        b = prompt("Во сколько обойдется?", "(в грн)");                                            
    if ( (typeof(a)) === 'string' && (typeof(a)) != null &&  (typeof(b)) != null
            && a != '' && b != '' && a.length < 50 ) {             
         console.log('well done!');
         appData.expenses[a] = b;
    } else {
    //не знав як реалізувати, цикл наново. Думав мітки go to. Набагато простіше...
        console.log('false!');
        i--;
    }   
}

appData.moneyPerDay = appData.budget/30;

alert("Everyday budget: " + appData.moneyPerDay);

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


