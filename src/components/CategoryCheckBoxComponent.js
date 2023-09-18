import React, {useState,useEffect} from 'react';
import "../styles/categoryCheckbox.css";


const CategoryCheckBoxComponent = ({ buttons, value, CheckedCategory }) => {

    const [selectedButtons, setSelectedButtons] = useState(value || []); 
    const handleCheckboxChange = (event) => {
        const { value: checkboxValue, checked } = event.target;
        if (checked) {
          setSelectedButtons((prevSelectedButtons) => [
            ...prevSelectedButtons,
            checkboxValue,
          ]);
        } else {
          setSelectedButtons((prevSelectedButtons) =>
            prevSelectedButtons.filter((btnValue) => btnValue !== checkboxValue)
          );
        }
      };
    
      useEffect(() => {
        CheckedCategory(selectedButtons);
      }, [selectedButtons]);
    return (
        <div className="checkbox-button-group">
            {buttons.map((button, index) => (
                <label key={index} className="checkbox-button">
                <input
                    type="checkbox"
                    value={button.value}
                    checked={selectedButtons.includes(button.value)}
                    onChange={handleCheckboxChange}
                />
                {button.label}
                </label>
            ))}
        </div>
    )    
}


export default CategoryCheckBoxComponent;