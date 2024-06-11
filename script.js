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
    if(b == 0){
        return "nice try"
    }
    return a/b;
}

let value1;
let value2;
let operator;
let newValue = true;
let value2Exists = false;
let decimal = false;
let numDisplay = 0;

let displayNumber = document.querySelectorAll(".number"); 
let clearDisplay = document.querySelector(".clear"); 
let operatorButton = document.querySelectorAll(".operator");
let equalsButton = document.querySelector(".equals");
let backSpace = document.querySelector("#back");

let display = document.querySelector("#display-values"); 

function operate(operator, value1, value2){ 
    let operated;
    let factor = Math.pow(10, 8);
    if(operator == '+'){
        operated = add(value1, value2);
    } else if(operator == '-'){
        operated = subtract(value1, value2);
    } else if(operator == 'x'){
        operated = multiply(value1, value2);
    } else if(operator == '÷'){
        operated = divide(value1, value2);
        if(value2 == 0){
            display.textContent = operated;
            return display.textContent;
        }
        
    }
    operated = Math.round(operated*factor)/factor;
    display.textContent = operated;
}

function inputNumber(button){ //displays the numbers pressed 
    display.style.color = "#2d3937";

    if(newValue){
        newValue = false;
        numDisplay = 0;
        numDisplay++;
        if(button.textContent != '.'){
            display.textContent = button.textContent;
        } else {
            display.textContent = '0.'
        }
    } else {
        if(button.textContent == '.' && decimal == true ){ 
            //do nothing
        } else if (numDisplay < 9){
            if(button.textContent == '.') decimal = true; 
            display.textContent = display.textContent+button.textContent;
            numDisplay++;
        }
    }
}

displayNumber.forEach(button => {
    button.addEventListener("click", () => inputNumber(button));
});

function resetValues(){
    newValue = true;
    value2Exists = false;
    value1, value2 = 0;
    decimal = false;
    operator = "";
    numDisplay = 0;
    operatorButton.forEach(button => button.style.backgroundColor = "");
}

clearDisplay.addEventListener("click", () => {
    display.style.color = "";
    display.textContent = "0";
    resetValues();
})

function equals(){
    operatorButton.forEach(button => button.style.backgroundColor = "");
    value2 = Number(display.textContent);
    operate(operator, value1, value2);
    resetValues();
}

operatorButton.forEach(button => {
    button.addEventListener("click", () => {
        if(value2Exists){ //goes here if the second value is available to operate on
            value2 = Number(display.textContent);
            value1 = Number(operate(operator, value1, value2));
            operator = button.textContent;
            newValue = true;
            operatorButton.forEach(button => button.style.backgroundColor = "");
            button.style.backgroundColor = "#d2ffe1"
        } else { //goes here if value1 is still being defined
            decimal = false;
            value1 = Number(display.textContent);
            button.style.backgroundColor = "#d2ffe1"
            newValue = true;
            value2Exists = true; //preps value2 to be defined
            operator = button.textContent;
        }
    });
});

equalsButton.addEventListener("click", () => equals());

backSpace.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0,-1);
})

