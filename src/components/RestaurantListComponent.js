import React, { useState, useEffect } from 'react';
import CategorySelectorComponent from './CategorySelectorComponent';
import RestaurantDetailComponent from './RestaurantDetailcomponent';
import { getAllRestaurnts } from '../api/restaurant';
import { connect } from 'react-redux';
import "../styles/restaurantList.css";


const RestaurantListComponent = ({ userinfo }) => {

    const [categoryOptions, setCategoryOptions] = useState([
        { label: "Italian Food", value: "Italian Food" },
        { label: "French Food", value: "French Food" },
        { label: "Asian Food", value: "Asian Food" },
        { label: "Eastern Food", value: "Eastern Food" },
    ])

    const [selectedButton, setSelectButton] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const handleChangeCategories = (val) => {
        setSelectButton(val);
        if (selectedButton.length) {
            setRestaurants([])
            let restaurantsLst = [];
            for (var i = 0; i < allRestaurants.length; i++) {
                let selected_restaurant = selectedButton.filter((item) =>
                    allRestaurants[i]["categories"].includes(item)
                );
                if (selected_restaurant.length) {
                    restaurantsLst.push(allRestaurants[i]);
                }
            }
            setRestaurants([...restaurantsLst]);
        } else {
            setSelectButton([...allRestaurants])
        }
    }

    const getAllRestaurants = async () => {
        let userobject = { userId: userinfo.userId };
        const allRestaurantLst = await getAllRestaurnts(userobject);
        console.log("----restaurants in member");
        console.log(allRestaurantLst);
        if (allRestaurantLst.data.results.results.length) {
          setRestaurants([...allRestaurantLst.data.results.results])
          setAllRestaurants([...allRestaurantLst.data.results.results])
        }
    }

   useEffect(() => {
     getAllRestaurants();
   }, [])

    return (
        <div className="list-container">
            <CategorySelectorComponent
                buttons={categoryOptions}
                activeBtns={selectedButton}                
                onClickCategoryEvent={handleChangeCategories}
            />
            <div className="restaurant-list-elements">

            {restaurants.map((res, index) => {
                return (
                    <div className="res-details" key={index}>
                         <RestaurantDetailComponent
                            name={res.name}
                            categoryName={res.categories}
                            src={res.restaurantImg}
                            id={res._id}
                            userId={res.userId}
                            days={res.days}
                            seats={res.seats}
                            />
                    </div>
                )
            })}
              </div>
  
    </div>
    )    
}

const mapStateToProps = state => ({
    userinfo: state.userinfo
})


export default connect(mapStateToProps)(RestaurantListComponent);