import React, { useState } from 'react';
import "../styles/input.css";


const InputComponent = ({ onInputChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value); // Pass the input value to the parent component
  };

  return (
    <div className="input-element">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter something..."
      />
    </div>    
  );
};


export default InputComponent;