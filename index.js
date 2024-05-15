function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

let value1;
let value2;
let operator;
let newValue = true;
let value2Exists = false;

//button references
let displayNumber = document.querySelectorAll(".number"); 
let clearDisplay = document.querySelector(".clear"); 
let operatorButton = document.querySelectorAll(".operator")
let equalsButton = document.querySelector(".equals")

let display = document.querySelector("#display-values"); //display

function operate(operator, value1, value2){ //check why operated returns undefined
    let operated;
    if(operator == '+'){
        operated = add(value1, value2);
    } else if(operator == '-'){
        operated = subtract(value1, value2);
    } else if(operator == 'x'){
        operated = multiply(value1, value2);
    } else if(operator == '/'){
        operated = divide(value1, value2);
    }
    display.textContent = operated;
    return Number(display.textContent);
}

function inputNumber(button){
    display.style.color = "#2d3937";
    if(newValue){
        display.textContent = button.textContent;
        newValue = false;
    } else {
        display.textContent = display.textContent+button.textContent;
    }
}

displayNumber.forEach(button => {
    button.addEventListener("click", () => inputNumber(button));
});

clearDisplay.addEventListener("click", () => {
    display.style.color = "";
    display.textContent = "0";
    newValue = true;
    value2Exists = false;
    value1, value2 = 0;
    operator = "";
    operatorButton.forEach(button => button.style.backgroundColor = "");
})

function equals(){
    operatorButton.forEach(button => button.style.backgroundColor = "");
    value2 = Number(display.textContent);
    operate(operator, value1, value2);
}

operatorButton.forEach(button => {
    button.addEventListener("click", () => {
        if(value2Exists){
            value2 = Number(display.textContent);
            operator = button.textContent;
            value1 = operate(operator, value1, value2);
            newValue = true;
        } else {
            value1 = Number(display.textContent);
            button.style.backgroundColor = "#d2ffe1"
            newValue = true;
            value2Exists = true;
            operator = button.textContent;
        }
    });
});

equalsButton.addEventListener("click", () => equals());

