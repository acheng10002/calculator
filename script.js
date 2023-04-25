// already tested arithmetic functions
const add = (addendA, addendB) => (addendA + addendB);
  
const subtract = (minuend, subtrahend) => (minuend - subtrahend);

const multiply = (factorA, factorB) => (factorA * factorB);

const divide = (dividend, divisor) => (dividend / divisor);

let display = document.querySelector(".display");

// each single digit/operator input
let displayText = '';

// total input before user clicks equals
let displayAllText = '';

// all buttons except clear and equals
const operateParts = document.querySelectorAll('.operatePart');

// listens for clicks of digit/operator buttons, check for overflow of input,
// and set total input in the display to the displayAllText variable
operateParts.forEach(operatePart => {
    operatePart.addEventListener('click', event => {
        displayText = `${event.target.textContent}`;
        display.textContent += displayText;
        checkOverflow();
        displayAllText = display.textContent;
    });
});

// checks if the total input overflows the display
const displayContainer = document.querySelector('.displayContainer');
const displayItem = document.querySelector('.display');

function checkOverflow() {
    const displayContainerWidth = displayContainer.getBoundingClientRect().width;
    const displayItemWidth = displayItem.getBoundingClientRect().width;
    if (displayItemWidth > displayContainerWidth) {
        console.log('Use a smaller input.');
        display.textContent = 'Use a smaller input.';
    }
}

// for each part of a calculator operation
let operator;
let firstNumber;
let secondNumber;

// performs arithmetic functions after equals is clicked
function calculate(operator, firstNumber, secondNumber) {
    switch(operator) {
        case '+':
            return calculation = add(firstNumber, secondNumber);
            break;
        case '-':
            return calculation = subtract(firstNumber, secondNumber);
            break;
        case '*':
            return calculation = multiply(firstNumber, secondNumber);
            break;
        case '/':
            return calculation = divide(firstNumber, secondNumber);
            break;
        }
}

// for longer expressions with three or more numbers, assigned to the calculation every expression that precedes other digits
let calculation;

// for collection of operator(s)
let operatorMatch;

// for collection of number(s)
let numbersMatch;

// checks if user clicks equals before inputting anything, checks if user divides by zero
// checks if user inputted a long enough expression to be calculated
function operate(operator, firstNumber, secondNumber) {

    // find all arithemetic operators in the text display, return them as an array, operatorMatch
    operatorMatch = displayAllText.match(/[+\-*/]/g); 

    try {
        // find all numbers in the display, return them as an array,
        // and assign the array to the numbersMatch variable
        numbersMatch = displayAllText.match(/\d+(\.\d+)?/g).map(Number);
        
        // checks if user clicks equals before inputting anything
    } catch (error) {    
        console.log('An error occurred. Clear, and click on a number of operator.');
        display.textContent = 'Clear, and click on a number or operator.';
        return;
        }

    // checks if user divides by zero, if so, displays error message
    if (displayAllText.indexOf('/0') !== -1) {
        console.log('You cannot divide by 0!')
        display.textContent ='You cannot divide by 0!';
        return;
    }
        
    // if the numbersMatch array has less than 3 elements, not long enough of an expression to run calculate() function,
    if (numbersMatch.length < 2) {
    
        // assign empty string to the operator variable
        firstNumber = '';
        secondNumber = '';
        operator = '';

    // if the numbersMatch array has 3 elements,   
    } else if (numbersMatch.length === 2) {

        // the first number in the array is assigned to the firstNumber variable
        firstNumber = numbersMatch[0];

        // the second number in the array is assigned to the secondNumber variable
        secondNumber = numbersMatch[1];

        // assign the operatorMatch array's first element to the operator variable
        operator = operatorMatch[0];

        // evalulate the arthemetic operation
        calculation = calculate(operator, firstNumber, secondNumber);

        // put the calculation in the display div
        display.textContent = calculation;

    // if the numbersMatch array has more than 3 elements    
    } else if (numbersMatch.length > 2 ) {

        // do the calculation for the fist two-number expression
        firstNumber = numbersMatch[0];
        secondNumber = numbersMatch[1];
        operator = operatorMatch[0];
        calculation = calculate(operator, firstNumber, secondNumber);
    
        // loop through the subsequent numbers, 
        // adding them to the previous calculation which is assigned to the firstNumber variable
        for (let i = 2; i < numbersMatch.length; i++) {
            firstNumber = calculation;
            secondNumber = numbersMatch[i];
            operator = operatorMatch[i - 1];
            calculation = calculate(operator, firstNumber, secondNumber);
        }
        display.textContent = calculation;
    }
}

// listens for click of equals button
const equals = document.getElementById('equals');
equals.addEventListener('click', operate);

// clears the display
function clearDisplay() {
    displayAllText = '';
    display.textContent = '';
}

// listens for click of clear button
const clear = document.getElementById('clear');
clear.addEventListener('click', clearDisplay);