import React from 'react';
import DelButtonComponent from './DelButtonComponent';
import "../styles/reservedRestaurant.css";


const ReservedRestaurantComponent = ({ name,date,seats, id, onClickEvent }) => {

    const handleDeleteClick = () => {
        onClickEvent(id);
    }

    return (
        <div className="reserved-elements">
            <h2>Current Reservation</h2>
            <p className="reservation-name">Restaurant Name : { name }</p>
            <p className="reservation-date">Date : { date }</p>
            <p className="reservation-seats">Seats : { seats }</p>
            <DelButtonComponent name="Delete" onClickEvent={handleDeleteClick} />
        </div>
    )    
}


export default ReservedRestaurantComponent;