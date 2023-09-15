import React from 'react';
import RestaurantListComponent from '../components/RestaurantListComponent';
import TitleComponent from '../components/TitleComponent';
import Footer from '../components/footer';
import ScrollUpComponent from '../components/ScrollUpComponent';
import "../styles/memberRestaurants.css";

const MemberRestaurants = ({}) => {
    return (
        <div class="member-restaurants-elements">
            <TitleComponent title="Available Restaurants" />
            <RestaurantListComponent />
            <Footer />
            <ScrollUpComponent />
        </div>
    )
}



export default MemberRestaurants;