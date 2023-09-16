import React, {useState, useEffect} from 'react';
import "../styles/categorySelector.css";


const CategorySelectorComponent = ({ buttons, activeBtns, onClickCategoryEvent }) => {

    const [activeButtons, setActiveButtons] = useState([]);

    const isActiveButton = (buttonValue) => {
        return activeButtons.includes(buttonValue);
    }


    const toggleButton = (buttonValue) => {
        const index = activeButtons.indexOf(buttonValue);
        if (index === -1) {
          activeButtons.push(buttonValue);
        } else {
          activeButtons.splice(index, 1);
        }
        onClickCategoryEvent(activeButtons);
    }

    useEffect(() => {
        // Handle initial value or changes to the 'value' prop
        setActiveButtons(activeBtns || []);
      }, [activeBtns]);

    return (
        <div className="button-group">
            {buttons.map((btn, index) => {
                return (
                    <button
                    key={index}
                    onClick={() => toggleButton(btn.value)}
                    className={isActiveButton(btn.value) ? 'active' : ''}
                    >
                    { btn.label }
                    </button>
                )
            })}
                
        </div>
    )    
}


export default CategorySelectorComponent;