import './App.css';
import {useState} from 'react';

function App() {
  const [display, setDisplay] = useState('');

  const appendToDisplay = (value) => {
    setDisplay(prevDisplay => prevDisplay + value);
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const calculate = () => {
    try {
      const result = evaluateExpression(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const evaluateExpression = (expression) => {
    const tokens = expression.match(/\d+|[+*/()-]/g);
    const numbers = [];
    const operators = [];

    tokens.forEach(token => {
      if (!isNaN(token)) {
        numbers.push(parseFloat(token));
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length && operators[operators.length - 1] !== '(') {
          calculateOperation(numbers, operators);
        }
        operators.pop();
      } else {
        while (
          operators.length &&
          precedence(token) <= precedence(operators[operators.length - 1])
        ) {
          calculateOperation(numbers, operators);
        }
        operators.push(token);
      }
    });

    while (operators.length) {
      calculateOperation(numbers, operators);
    }

    return numbers.pop();
  };

  const precedence = (operator) => {
    if (operator === '+' || operator === '-') return 1;
    if (operator === '*' || operator === '/') return 2;
    return 0;
  };

  const calculateOperation = (numbers, operators) => {
    const operator = operators.pop();
    const operand2 = numbers.pop();
    const operand1 = numbers.pop();

    switch (operator) {
      case '+':
        numbers.push(operand1 + operand2);
        break;
      case '-':
        numbers.push(operand1 - operand2);
        break;
      case '*':
        numbers.push(operand1 * operand2);
        break;
      case '/':
        if (operand2 === 0) {
          throw new Error('Division by zero');
        }
        numbers.push(operand1 / operand2);
        break;
      default:
        throw new Error('Invalid operator');
    }
  };

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input type="text" value={display} disabled />
      <div>
        <button onClick={() => appendToDisplay('7')}>7</button>
        <button onClick={() => appendToDisplay('8')}>8</button>
        <button onClick={() => appendToDisplay('9')}>9</button>
        <button onClick={clearDisplay}>C</button><br />
        <button onClick={() => appendToDisplay('4')}>4</button>
        <button onClick={() => appendToDisplay('5')}>5</button>
        <button onClick={() => appendToDisplay('6')}>6</button>
        <button onClick={() => appendToDisplay('+')}>+</button><br />
        <button onClick={() => appendToDisplay('1')}>1</button>
        <button onClick={() => appendToDisplay('2')}>2</button>
        <button onClick={() => appendToDisplay('3')}>3</button>
        <button onClick={() => appendToDisplay('-')}>-</button><br />
        <button onClick={() => appendToDisplay('0')}>0</button>
        <button onClick={() => appendToDisplay('*')}>*</button>
        <button onClick={() => appendToDisplay('/')}>/</button>
        <button onClick={calculate}>=</button><br />
      </div>
    </div>
  );
}

export default App;
