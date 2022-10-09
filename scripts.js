const numbers = document.querySelectorAll(".numbers"); // 0 1 2 3 4 5 6 7 8 9
const result = document.querySelector(".result span");
const signs = document.querySelectorAll(".sign"); // % / x - +
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const percent = document.querySelector(".percent");
const negative = document.querySelector(".negative");
const decimal = document.querySelector(".decimal");

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;


// for all numbers, add event listener for click.
// sets atr as whatever was clicked and sets up either the first or second number in eqn
for(let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", (e) => {
        let atr = e.target.getAttribute("value");
        if(isFirstValue === false) {
            getFirstValue(atr)
        }
        if(isSecondValue === false) {
            getSecondValue(atr);
        }
    })
}

// setting up the first number in our equation
function getFirstValue(el) {
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}

// setting up the second number in our equation
// can only set up second number if first number is set up
function getSecondValue(el) {
    if(firstValue != "" && sign != "") {
        secondValue += el;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
        isSecondValue = true;
    }
}

// ticks first value as true when an operator is clicked
function getSign() {
    for(let i = 0; i < signs.length; i++) {
        signs[i].addEventListener("click", (e) => {
            sign = e.target.getAttribute("value");
            isFirstValue = true;
        })
    }
}
getSign();

// performs the math after equals is clicked and prints the result into the results div section
// TODO when pressing negative on the solved result, pressing equals turns it to the opposite sign
equals.addEventListener("click", () => {
    result.innerHTML = "";
    if(sign === "+") {
        resultValue = firstValue + secondValue;
    }
    else if(sign === "-") {
        resultValue = firstValue - secondValue;
    }
    else if(sign === "x") {
        resultValue = firstValue * secondValue;
    }
    else if(sign === "/") {
        resultValue = firstValue / secondValue;
    }
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";
    isFirstValue = true;
    isSecondValue = false;
    checkResultLength();
})

// fixes the amount of decimal places to 5
// TODO find a way to scale the font based on overflow, or to contain it in the results div
function checkResultLength() {
    resultValue = JSON.stringify(resultValue);
    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

// clear/AC will reset everything to base 
clear.addEventListener("click", () => {
    result.innerHTML = 0;

    firstValue = "";
    secondValue = "";
    sign = "";
    isFirstValue = false;
    isSecondValue = false;
    resultValue = 0;
})

// adding functionality to negative button. have to account for making first, second, and result numbers negative
negative.addEventListener("click", () => {
    result.innerHTML = "";
    if(firstValue != "" && isFirstValue === false) {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if(firstValue != "" && secondValue != "" && sign != "" && isSecondValue != false) {
        resultValue = -secondValue;
        secondValue = resultValue;
    }
    if(firstValue != "" && isSecondValue === false && isFirstValue != false) {
        resultValue = -resultValue;
    }
    result.innerHTML = resultValue;
})

// adding functionality to percent button
percent.addEventListener("click", () => {
    result.innerHTML = "";
    if(firstValue != "" && isFirstValue === false) {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }
    if (firstValue != "" && secondValue != "" && sign != "" && isSecondValue != false) {
        resultValue = secondValue / 100;
        secondValue = resultValue;
    }
    if(firstValue != "" && isSecondValue === false && isFirstValue != false) {
        resultValue = resultValue / 100;
    }
    result.innerHTML = resultValue;
})