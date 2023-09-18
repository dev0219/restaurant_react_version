import React from 'react';
import "../styles/userRestaurantList.css";
import ScrollUpComponent from './ScrollUpComponent';
import UserRestaurantDetailComponent from './UserRestaurantDetailComponent';


const UserRestaurantListComponent = ({ restaruntArr, DelRestaurant }) => {

    const handleDel = (val) => {
        DelRestaurant(val);
    }
    return (
        <div className="list-container">
            <div className="restaurant-list-elements">
                {restaruntArr.map((res, index) => {
                    return (
                        <div className="res-details" key={res._id}>
                            <UserRestaurantDetailComponent
                                name={res.name}
                                categoryName={res.categories}
                                src={res.restaurantImg}
                                id={res._id}
                                userId={res.userId}
                                days={res.days}
                                seats={res.seats}
                                handleRestaurantDel={handleDel}
                            />
                        </div>
                    )
                })}
            </div>
            <ScrollUpComponent />
        </div>
    )    
}


export default UserRestaurantListComponent;