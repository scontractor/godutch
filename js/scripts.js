class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        if (this.operation != null) {
            document.querySelector('.previous-operand').textContent =
                `${this.previousOperand} ${this.operation}`;
        } else {
            document.querySelector('.previous-operand').textContent = '';
        }
    }
}

// Create calculator instance
const calculator = new Calculator();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Debug log to verify event listener is working
    console.log('DOM fully loaded');

    // Number buttons
    const numberButtons = document.querySelectorAll('[data-number]');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Number clicked:', button.textContent); // Debug log
            calculator.appendNumber(button.textContent);
            calculator.updateDisplay();
        });
    });

    // Operator buttons
    const operatorButtons = document.querySelectorAll('[data-action="operator"]');
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Operator clicked:', button.textContent); // Debug log
            calculator.chooseOperation(button.textContent);
            calculator.updateDisplay();
        });
    });

    // Equals button
    const equalsButton = document.querySelector('[data-action="calculate"]');
    equalsButton.addEventListener('click', () => {
        console.log('Equals clicked'); // Debug log
        calculator.calculate();
        calculator.updateDisplay();
    });

    // Clear button
    const clearButton = document.querySelector('[data-action="clear"]');
    clearButton.addEventListener('click', () => {
        console.log('Clear clicked'); // Debug log
        calculator.clear();
        calculator.updateDisplay();
    });

    // Delete button
    const deleteButton = document.querySelector('[data-action="delete"]');
    deleteButton.addEventListener('click', () => {
        console.log('Delete clicked'); // Debug log
        calculator.delete();
        calculator.updateDisplay();
    });

    // Initial display update
    calculator.updateDisplay();
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '%') {
        let operation = event.key;
        if (operation === '*') operation = '×';
        if (operation === '/') operation = '÷';
        calculator.chooseOperation(operation);
        calculator.updateDisplay();
    }
    if (event.key === 'Enter' || event.key === '=') {
        calculator.calculate();
        calculator.updateDisplay();
    }
    if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});