import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import TitleComponent from '../components/TitleComponent';
import InputTitleComponent from '../components/InputTitleComponent';
import InputComponent from '../components/InputComponent';
import ImageUploaderComponent from '../components/ImageUploaderComponent';
import CategoryCheckBoxComponent from '../components/CategoryCheckBoxComponent';
import DaySelectComponent from '../components/DaySelectComponent';
import ButtonComponent from '../components/ButtonComponent';
import SelectNumberComponent from '../components/SelectNumberComponent';
import Footer from '../components/footer';
import { createRestaurnt } from '../api/restaurant';
import { handleStoreConfirm, handleCreateConfirm } from '../actions';
import "../styles/restaurantCreate.css";



const RestaurantCreate = ({dispatch, userinfo}) => {
    const navigate = useNavigate();
    const [days, setDays] = useState([
        { label: "M", value: "monday" },
        { label: "T", value: "tuesday" },
        { label: "W", value: "wendnesday" },
        { label: "TH", value: "thursday" },
        { label: "F", value: "friday" },
        { label: "S", value: "saturday" },
        { label: "SN", value: "sunday" },
      ])

    const [restaurantName, setRestaurantName] = useState("");
    const [categories, setCategories] = useState([]);
    const [imageValue, setImageValue] = useState(null);
    const [activeDays, setActiveDays] = useState([]);
    const [seats, setSeats] = useState(2);
    const [categoryOptions, setCategoryoptions] = useState([
        { label: "Italian Food", value: "Italian Food" },
        { label: "French Food", value: "French Food" },
        { label: "Asian Food", value: "Asian Food" },
        { label: "Eastern Food", value: "Eastern Food" },
      ])
    
    const handleImageUpload = (imageData) => {
        setImageValue(imageData);
    }

    const getRestaurantName = (event) => {
        setRestaurantName(event);
    }

    const getAvailableDays = (values) => {
        setActiveDays(values);
    }

    const getSeats = (values) => {
        setSeats(values);
    }

    const getCategories = (values) => {
        setCategories(values);
    }
    
    const handleCreateRestaurant = async () => {
        let newRestaurantObj = {
            name: restaurantName,
            restaurantImg: imageValue,
            categories: categories,
            seats: seats,
            days: activeDays,
            userId: userinfo.userId,
          };
          try {
            const is_created = await createRestaurnt(newRestaurantObj);
            if (is_created.success && is_created.data.result.status == 2) {
                dispatch(handleStoreConfirm(true));
                dispatch(handleCreateConfirm(true));
                setTimeout(() => {
                    navigate("/restaurantprofile");
                }, 2000);
            }
          } catch (error) {
            console.log("Error: ", error);
          }
    }

    return (
        <div className="restaurant-profile-elements">
            <TitleComponent title="New Restaurant" />
            <InputTitleComponent name="Restaurant Name" />
            <InputComponent value={restaurantName} onInputChange={getRestaurantName} />
            <InputTitleComponent name="Please Upload the featured Restaurant Image" />
            <ImageUploaderComponent src={imageValue} getImage={handleImageUpload} />
            <InputTitleComponent name="Category" />
            <CategoryCheckBoxComponent
                value={categories}
                buttons={categoryOptions}
                CheckedCategory={getCategories}
            />
            <InputTitleComponent name="Seats Available" />
            <SelectNumberComponent
                value={seats}
                step="2"
                maxnumber="20"
                onClickEvent={getSeats}
            />
            <InputTitleComponent name="Days Open" />
            <DaySelectComponent
                value={activeDays}
                buttons={days}
                getDays={getAvailableDays}
            />
            <div className="restaurant-profile-actions">
                <ButtonComponent name="SAVE" onClickEvent={handleCreateRestaurant} />
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    userinfo: state.userinfo
})


export default connect(mapStateToProps)(RestaurantCreate);