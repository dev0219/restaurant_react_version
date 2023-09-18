import React, {useState} from 'react';
import "../styles/daysSelect.css";


const DaySelectComponent = ({ buttons, value, getDays }) => {

    const [activeButtons, setActiveButtons] = useState(value || []);
    const toggleButton = (buttonValue) => {
        const index = activeButtons.indexOf(buttonValue);
        if (index === -1) {
          setActiveButtons([...activeButtons, buttonValue]);
        } else {
          setActiveButtons(activeButtons.filter((btnValue) => btnValue !== buttonValue));
        }
        emitActiveButtonValues();
      };
    
    const isActiveButton = (buttonValue) => {
        return activeButtons.includes(buttonValue);
    };

    const emitActiveButtonValues = () => {
        getDays(activeButtons);
    };
    return (
        <div className="button-group">
            {buttons.map((button, index) => (
                <button
                key={index}
                onClick={() => toggleButton(button.value)}
                className={isActiveButton(button.value) ? 'active' : ''}
                >
                {button.label}
                </button>
            ))}
        </div>
    )    
}


export default DaySelectComponent;