import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import { handleStoreRestaurantInfo } from '../actions';
import { connect } from 'react-redux';
import "../styles/restaurantDetail.css";


const RestaurantDetailComponent = ({ dispatch, name, categoryName,userId,days,src, id, seats }) => {
    const navigate = useNavigate();
    const BookReserved = () => {
        let restaurantObj = {
            _id: id,
            name: name,
            restaurantImg: src,
            categories: categoryName,
            seats: seats,
            days: days,
            userId: userId,
        };
        localStorage.setItem("restaurantInfo", JSON.stringify(restaurantObj));
        console.log("----restanrt ob", restaurantObj)
        console.log("----dispatch", dispatch)
        dispatch(handleStoreRestaurantInfo(restaurantObj));
        navigate("/bookreservation");
    }

    return (
        <div className="restaurant-details-elements">
            <div className="detail-object">
            <h2>{ name }</h2>
            <img src={src} />
                <ButtonComponent name="BOOK RESERVATION" onClickEvent={BookReserved} />
            </div>
        </div>
    )    
}


export default connect()(RestaurantDetailComponent);