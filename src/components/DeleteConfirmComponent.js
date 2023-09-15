import React from 'react';
import ButtonComponent from './ButtonComponent';
import DelButtonComponent from './DelButtonComponent';
import "../styles/deleteConfirm.css";


const DeleteConfirmComponent = ({ content, onClickConfirmEvent, onClickCancelEvent }) => {

    const handleConfirmClick = () => {
        onClickConfirmEvent();
    }

    const handleCancelClick = () => {
        onClickCancelEvent();
    }

    return (
        <div className="delete-confirm-element">
            <p className="delete-content">{ content }</p>
            <div className="delete-actions">
                <ButtonComponent name="Confirm" onClickEvent={handleConfirmClick} />
                <DelButtonComponent name="Cancel" onClickEvent={handleCancelClick} />
            </div>
        </div>
    )    
}


export default DeleteConfirmComponent;