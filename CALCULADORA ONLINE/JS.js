let display = document.getElementById('display');
let keys = document.querySelectorAll('.keys button');

let calculator = {
  displayValue: '',
  firstOperand: '',
  operator: '',
  secondOperand: '',
  result: ''
};

function saveCalculatorState() {
  localStorage.setItem('calculatorState', JSON.stringify(calculator));
}

function loadCalculatorState() {
  const savedState = localStorage.getItem('calculatorState');
  if (savedState) {
    calculator = JSON.parse(savedState);
    display.value = calculator.displayValue;
  }
}

window.addEventListener('load', loadCalculatorState);

keys.forEach(key => {
  key.addEventListener('click', handleKeyClick);
});

function handleKeyClick(event) {
  const keyValue = event.target.textContent.trim();

  switch (keyValue) {
    case 'C':
      resetCalculator();
      break;
    case '←':
      calculator.displayValue = calculator.displayValue.slice(0, -1);
      break;
    case '+':
    case '-':
    case '/':
    case '*':
      handleOperator(keyValue);
      break;
    case '=':
      calculateResult();
      break;
    default:
      calculator.displayValue += keyValue;
  }

  display.value = calculator.displayValue;
  saveCalculatorState(); 
}

function resetCalculator() {
  calculator.displayValue = '';
  calculator.firstOperand = '';
  calculator.operator = '';
  calculator.secondOperand = '';
  calculator.result = '';

  localStorage.removeItem('calculatorState');

  display.value = ''; 
}

function handleOperator(op) {
  if (calculator.firstOperand && calculator.operator) {
    calculateResult();
  }
  calculator.operator = op;
  calculator.firstOperand = calculator.displayValue;
  calculator.displayValue += ` ${op} `;
}

function calculateResult() {
  let result = 0;
  let operands = calculator.displayValue.split(' ');
  calculator.secondOperand = operands[2];

  switch (calculator.operator) {
    case '+':
      result = parseFloat(calculator.firstOperand) + parseFloat(calculator.secondOperand);
      break;
    case '-':
      result = parseFloat(calculator.firstOperand) - parseFloat(calculator.secondOperand);
      break;
    case '/':
      result = parseFloat(calculator.firstOperand) / parseFloat(calculator.secondOperand);
      break;
    case '*':
      result = parseFloat(calculator.firstOperand) * parseFloat(calculator.secondOperand);
      break;
  }

  calculator.result = result.toString().replace('.', ',');

  calculator.displayValue = calculator.result;

  calculator.firstOperand = '';
  calculator.operator = '';
  calculator.secondOperand = '';

  saveCalculatorState(); 
}
