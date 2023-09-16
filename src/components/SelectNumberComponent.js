import React, {useState} from 'react';
import "../styles/selectNumber.css";


const SelectNumberComponent = ({ value, maxnumber, step, onClickEvent }) => {

    const [localValue, setLocalValue] = useState(Number(value));

    const decreaseValue = () => {
        let currentVal = Number(localValue);
        currentVal -= Number(step);
        setLocalValue(currentVal);
        onClickEvent(currentVal);
    }

    const increaseValue = () => {
        let currentVal = Number(localValue);
        currentVal += Number(step);
        setLocalValue(currentVal);
        onClickEvent(currentVal);
    }

    return (
        <div className="seat-number-control">
            <button className="min-btn" onClick={()=>decreaseValue()} disabled={localValue <= 1}>
            -
            </button>
            <input type="number" className="number-control" value={localValue} disabled />
            <button
                className="max-btn"
                onClick={()=>increaseValue()}
                disabled={localValue >= maxnumber}
            >
            +
            </button>
        </div>
    )    
}


export default SelectNumberComponent;