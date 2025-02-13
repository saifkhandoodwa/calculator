let display = document.querySelector('.display');
let buttons = document.querySelectorAll('.btn');
let currentValue = '';
let firstOperand = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            // Append numbers or decimal to currentValue
            if (value === '.' && currentValue.includes('.')) {
                // Prevent multiple decimals
                return;
            }
            currentValue += value;
            display.textContent = currentValue || '0';
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Handle operators
            if (currentValue !== '') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentValue);
                } else if (operator) {
                    // Perform calculation if an operator is already set
                    const result = calculate(firstOperand, parseFloat(currentValue), operator);
                    firstOperand = result;
                    display.textContent = result;
                }
                operator = value;
                currentValue = '';
            }
        } else if (value === '=') {
            // Handle equals button
            if (operator && firstOperand !== null && currentValue !== '') {
                const result = calculate(firstOperand, parseFloat(currentValue), operator);
                display.textContent = result;
                currentValue = result.toString();
                firstOperand = null;
                operator = null;
            }
        } else if (value === 'C') {
            // Handle clear button
            currentValue = '';
            firstOperand = null;
            operator = null;
            display.textContent = '0';
        }
    });
});

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return secondOperand === 0
                ? 'Error' // Handle division by zero
                : firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}
