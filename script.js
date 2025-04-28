const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operator]');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('[all-clear]');
const delButton = document.querySelector('[delete]');
const lastOperationScreen = document.querySelector('.last-operation');
const currentOperationScreen = document.querySelector('.current-operation');

let operation = null;
let currentOperand = '';
let lastOperand = '';
let reset = false;

window.addEventListener('keydown', keyboardInput);
clearButton.addEventListener('click', clear);
delButton.addEventListener('click', deleteNum);
equalsButton.addEventListener('click', evaluate);

numberButtons.forEach((button) => 
    button.addEventListener('click', () => appendNum(button.textContent))
)

operationButtons.forEach((button) => 
    button.addEventListener('click', () => setOperation(button.textContent))
)

function keyboardInput(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') appendNum(e.key);
    if(e.key === '=' || e.key === 'Enter') evaluate();
    if(e.key === 'Backspace') deleteNum();
    if(e.key === 'Escape') clear();
    if(e.key === '+' || e.key === '-' || e.key === '*' ||  e.key === '/') setOperation(convert(e.key));
}

function convert(operator) {
    if (operator === '+') return '+';
    if (operator === '-') return '-';
    if (operator === '*') return 'x';
    if (operator === '/') return '÷';
}

function appendNum(number) {
    if (number === '.' && currentOperationScreen.textContent.includes('.')) return;
    if (currentOperationScreen.textContent === '0' ||reset) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    reset = false
}

function setOperation(operator) {
    if (operation !== null) evaluate()
    currentOperand = currentOperationScreen.textContent;
    operation = operator;
    lastOperationScreen.textContent =  `${currentOperand} ${operation}`;
    reset = true;
}

function evaluate() {
    lastOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(compute(operation, currentOperand, lastOperand));
    lastOperationScreen.textContent = '';
    operation = null;
    
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}


function clear() {
    currentOperationScreen.textContent = '';
    lastOperationScreen.textContent = '';
    currentOperand = '';
    lastOperand = '';
}

function deleteNum() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1)
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function compute(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if (b != 0) {
                return divide(a, b);
            }
        default:
            return null;
    }
}
