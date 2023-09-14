import React from 'react';
import "../styles/button.css";


const ButtonComponent = ({ name, onClickEvent }) => {

    const handleButtonClick = () => {
        onClickEvent();
    }
    return (
        <button className="button" onClick={() => handleButtonClick()}>{ name }</button>
    )    
}


export default ButtonComponent;