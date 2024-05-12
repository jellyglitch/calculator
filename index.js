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

function operate(operator, value1, value2){
    if(operator == '+'){
        add(value1, value2);
    } else if(operator == '-'){
        subtract(value1, value2);
    } else if(operator == '*'){
        multiply(value1, value2);
    } else if(operator == '/'){
        divide(value1, value2);
    }
}

let displayNumber = document.querySelectorAll(".number");
let clearDisplay = document.querySelector(".clear");

let display = document.querySelector("#display-values");
display.textContent = "0";

function inputNumber(button){
    display.style.color = "#2d3937";
    if(display.textContent === "0"){
        display.textContent = button.textContent;
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
})