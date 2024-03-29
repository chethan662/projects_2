import './App.css';
import {useState} from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input className="input" type="text" value={input} readOnly />
      <p><div className="result">{result}</div></p>
      <div >
        <div >
          <button className="button" onClick={() => handleButtonClick('7')}>7</button>
          <button className="button" onClick={() => handleButtonClick('8')}>8</button>
          <button className="button" onClick={() => handleButtonClick('9')}>9</button>
          <button className="button" onClick={() => handleButtonClick('+')}>+</button>
        </div>
        <div >
          <button className="button" onClick={() => handleButtonClick('4')}>4</button>
          <button className="button" onClick={() => handleButtonClick('5')}>5</button>
          <button className="button" onClick={() => handleButtonClick('6')}>6</button>
          <button className="button" onClick={() => handleButtonClick('-')}>-</button>
        </div>
        <div>
          <button className="button" onClick={() => handleButtonClick('1')}>1</button>
          <button className="button" onClick={() => handleButtonClick('2')}>2</button>
          <button className="button" onClick={() => handleButtonClick('3')}>3</button>
          <button className="button" onClick={() => handleButtonClick('*')}>*</button>
        </div>
        <div>
          <button className="button" onClick={handleClear}>C</button>
          <button className="button" onClick={() => handleButtonClick('0')}>0</button>
          <button className="button" onClick={handleCalculate}>=</button>
          <button className="button" onClick={() => handleButtonClick('/')}>/</button>
        </div>
      </div>
    </div>
  );
}

export default App;