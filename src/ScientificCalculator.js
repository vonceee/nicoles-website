import React, { useState } from 'react';
import './styles/ScientificCalculator.css';

const ScientificCalculator = ({ onBack }) => {
  const [display, setDisplay] = useState("");
  const [lastEntry, setLastEntry] = useState("");

  // Append characters to the display
  const handleClick = (value) => {
    setDisplay(display + value);
  };

  // Clear the display
  const handleClear = () => {
    setDisplay("");
  };

  // Remove the last character
  const handleBackspace = () => {
    setDisplay(display.slice(0, -1));
  };

  // Factorial helper function
  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let res = 1;
    for (let i = 1; i <= n; i++) {
      res *= i;
    }
    return res;
  };

  // Preprocess the expression before evaluation:
  // Replace scientific functions with Math equivalents,
  // Replace '^' with '**', constants π and e,
  // And convert occurrences like "5!" to factorial(5)
  const preprocessExpression = (expr) => {
    let processed = expr
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log")
      .replace(/sqrt/g, "Math.sqrt")
      .replace(/\^/g, "**")
      .replace(/π/g, Math.PI.toString())
      .replace(/e(?![a-zA-Z])/g, Math.E.toString());
    processed = processed.replace(/(\d+)!/g, (_, n) => `factorial(${n})`);
    return processed;
  };

  // Evaluate the expression and update the preview (lastEntry)
  const handleCalculate = () => {
    try {
      const expression = preprocessExpression(display);
      // eslint-disable-next-line no-eval
      const result = eval(expression);
      setLastEntry(display + " = " + result);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  // Toggle the sign of the current display value
  const toggleSign = () => {
    if (display) {
      if (display[0] === '-') {
        setDisplay(display.substring(1));
      } else {
        setDisplay("-" + display);
      }
    }
  };

  return (
    <div className="calculator-modal">
      <div className="calculator">
        <div className="calc-header">
          <h2>Calculator</h2>
          {onBack && (
            <button className="back-button" onClick={onBack}>
              X
            </button>
          )}
        </div>
        {/* Preview area for the last computed entry */}
        {lastEntry && <div className="last-entry">{lastEntry}</div>}
        <div className="display">{display || "0"}</div>
        <div className="buttons">
          {/* Row: Parentheses and constants */}
          <button onClick={() => handleClick("(")}>(</button>
          <button onClick={() => handleClick(")")}>)</button>
          <button onClick={() => handleClick("π")}>π</button>
          <button onClick={() => handleClick("e")}>e</button>

          {/* Row: Scientific functions */}
          <button onClick={() => handleClick("sin(")}>sin</button>
          <button onClick={() => handleClick("cos(")}>cos</button>
          <button onClick={() => handleClick("tan(")}>tan</button>
          <button onClick={() => handleClick("log(")}>log</button>

          {/* Row: More operators */}
          <button onClick={() => handleClick("sqrt(")}>√</button>
          <button onClick={() => handleClick("^")}>^</button>
          <button onClick={handleBackspace}>←</button>
          <button onClick={handleClear}>C</button>

          {/* Row: Numbers and division */}
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("/")}>÷</button>

          {/* Row: Numbers and multiplication */}
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("*")}>×</button>

          {/* Row: Numbers and subtraction */}
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("-")}>-</button>

          {/* Row: Additional functions */}
          <button onClick={toggleSign}>±</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("!")}>!</button>

          {/* Row: Equals and addition */}
          <button onClick={handleCalculate}>=</button>
          <button onClick={() => handleClick("+")}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
