import React, {useState, useEffect} from 'react';
import "../styles/daysSelect.css";


const DaySelectComponent = ({ buttons, value, getDays }) => {

    const [activeButtons, setActiveButtons] = useState(value || []);
    const toggleButton = (buttonValue) => {
        setActiveButtons((prevActiveButtons) => {
            const index = prevActiveButtons.indexOf(buttonValue);
            if (index === -1) {
              return [...prevActiveButtons, buttonValue];
            } else {
              return prevActiveButtons.filter((btnValue) => btnValue !== buttonValue);
            }
          });
        //   emitActiveButtonValues();
      };
    
    const isActiveButton = (buttonValue) => {
        return activeButtons.includes(buttonValue);
    };

    // const emitActiveButtonValues = () => {
    //     console.log("---active buttons in compoinent");
    //     console.log(activeButtons);
    //     getDays(activeButtons);
    // };

    useEffect(() => {
        getDays(activeButtons);
    },[activeButtons])
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