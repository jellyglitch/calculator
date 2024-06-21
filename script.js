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
let hasDecimal = false;
let numDisplay = 0;

let numberButtons = document.querySelectorAll(".number"); 
let clearButton = document.querySelector("#clear"); 
let operatorButton = document.querySelectorAll(".operator");
let equalsButton = document.querySelector("#equals");
let backSpaceButton = document.querySelector("#back");

let display = document.querySelector("#display-values"); 

function operate(operator, value1, value2){ 
    let answer;
    let factor = Math.pow(10, 8); //number of digits to display on screen is limited by this factor

    if(operator == '+'){
        answer = add(value1, value2);
    } else if(operator == '-'){
        answer = subtract(value1, value2);
    } else if(operator == 'x'){
        answer = multiply(value1, value2);
    } else if(operator == '÷' || operator == '/'){
        if(value2 == 0){
            display.textContent = answer;
            return display.textContent;
        }
        answer = divide(value1, value2);
        
    } else {
        answer = value2;
    }
    answer = Math.round(answer*factor)/factor;
    display.textContent = answer;
    return answer;
}

/** 
 * Updates the display with the text content of the button clicked.
 *
 * @param {Element} button - The number button element that was clicked.
 */
function inputNumber(button){ //displays the numbers pressed 
    display.style.color = "#2d3937"; 

    if(newValue){ //if it's the first digit of a new value
        hasDecimal = false;
        numDisplay = 0; //digits on display (max 8)
        
        if(button.textContent == '.'){
            display.textContent = '0.';
            hasDecimal = true;
        } else {
            display.textContent = button.textContent;
        }

        numDisplay++;
        newValue = false;

    } else if (numDisplay < 9){
        
        if(button.textContent == '.' && hasDecimal == true ) return; //prevents adding multiple decimals
        if(button.textContent == '.') hasDecimal = true; //first decimal to input

        display.textContent = display.textContent+button.textContent;
        numDisplay++;
        
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => inputNumber(button));
});

/** 
 * Handles the keydown event when using keyboard for input
 *
 * @param {Event} event - the keydown event
 */
document.addEventListener("keydown", (event) => {
    let button = document.createElement('button');
    const key = event.key;
    let str = `${key}`;
    button.textContent = str;

    if(!isNaN(key) || key == '.'){
        inputNumber(button);
    } else if (key == '+' || key == '-' || key == '/' || key == 'x'){
        operateHandler(button);
    } else if (key == '='){
        equals();
    } else if (key == 'Backspace'){
        back();
    }
    
});

function resetValues(){
    newValue = true;
    value2Exists = false;
    value1 = 0;
    value2 = 0;
    hasDecimal = false;
    operator = "";
    operatorButton.forEach(button => button.style.backgroundColor = "");
}

/** 
 * Handles the click event for the clear button
 *
 * @param {Event} event - the click event
 */
clearButton.addEventListener("click", () => {
    display.style.color = "";
    display.textContent = "0";
    resetValues();
})

/*
 * Given two values and an operator, it evaluates the answer
 *
 */
function equals(){
    operatorButton.forEach(button => button.style.backgroundColor = "");
    value2 = Number(display.textContent);
    operate(operator, value1, value2);
    resetValues();
}

/** 
 * Handles the preparation of operating on value1 and value2
 *
 * @param {Element} button - The operator button element that was clicked.
 */
function operateHandler(button){
    if(!value2Exists){ //value1 hasn't been defined yet
        button.style.backgroundColor = "#d2ffe1"
        newValue = true;
        value1 = Number(display.textContent);
        value2Exists = true; //preps value2 to be defined next
        operator = button.textContent; //defined to allow chaining of operations before equals is pressed
    } else { //value1 and value2 are ready to be operated on
        value2 = Number(display.textContent);
        value1 = Number(operate(operator, value1, value2)); //operates if operator button was pressed more than once before equals button
        operator = button.textContent;
        newValue = true;
        operatorButton.forEach(button => button.style.backgroundColor = "");
        button.style.backgroundColor = "#d2ffe1"
    }
}

operatorButton.forEach(button => {
    button.addEventListener("click", () => operateHandler(button));
});

equalsButton.addEventListener("click", () => equals());

function back(){
    display.textContent = display.textContent.slice(0,-1);
}

backSpaceButton.addEventListener("click", () => back());

