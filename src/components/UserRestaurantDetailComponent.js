import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import DelButtonComponent from './DelButtonComponent';
import { handleStoreRestaurantInfo } from '../actions';
import { connect } from 'react-redux';
import "../styles/userRestaurantDetail.css";


const UserRestaurantDetailComponent = ({ dispatch, id, name,src, categoryName, seats, days, userId ,handleRestaurantDel, userinfo}) => {

    const navigate = useNavigate();

    const Edit = () => {
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
        dispatch(handleStoreRestaurantInfo(restaurantObj));
        navigate("/edit-restaurant")

    }

    const Delete = () => {
        handleRestaurantDel(id);
    }

    return (
        <div className="restaurant-details-elements">
            <h2>{ name }</h2>
            <div className="rest-img">
                <img src={src} />
            </div>
            <div className="categories">
            { categoryName.map((button, index) => {
                return (
                    <button
                        className="category-item"
                        key={index}
                    >
                        { button }
                    </button>
                )
            })}
            
            </div>
            <div className="restaurant-actions">
                <ButtonComponent name="EDIT" onClickEvent={Edit} />
                <DelButtonComponent name="DELETE" onClickEvent={Delete} />
            </div>
        </div>
    )    
}

const mapStateToProps = state => ({
    userinfo: state.userinfo
})

export default connect(mapStateToProps)(UserRestaurantDetailComponent);