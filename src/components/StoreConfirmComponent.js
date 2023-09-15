import React from 'react';
import "../styles/storeConfirm.css";


const StoreConfirmComponent = ({ Storecontent }) => {
    
    return (
        <div className="store-confirm-element success">
            { Storecontent }
        </div>
    )    
}


export default StoreConfirmComponent;