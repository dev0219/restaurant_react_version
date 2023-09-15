import React, {useState} from 'react';
import CategorySelectorComponent from './CategorySelectorComponent';
import "../styles/restaurantList.css";


const RestaurantListComponent = ({ }) => {

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

    return (
        <div class="list-container">
            <CategorySelectorComponent
                buttons={categoryOptions}
                activeBtns={selectedButton}                
                onClickCategoryEvent={handleChangeCategories}
            />
    </div>
    )    
}


export default RestaurantListComponent;