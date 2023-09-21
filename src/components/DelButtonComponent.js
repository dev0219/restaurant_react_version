import React from 'react';
import "../styles/delButton.css";


const DelButtonComponent = ({ name, onClickEvent }) => {

    const handleButtonClick = () => {
        onClickEvent();
    }
    return (
        <button className="del-button" onClick={() => handleButtonClick()}>{ name }</button>
    )    
}


export default DelButtonComponent;