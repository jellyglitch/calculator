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

displayNumber.forEach(button => {
    button.addEventListener("click", () => {
        display.style.color = "#2d3937";
        display.textContent = button.textContent;
      });
});

clearDisplay.addEventListener("click", () => {
    display.style.color = "";
    display.textContent = "0";
})