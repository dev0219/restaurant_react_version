import React, {useState, useEffect} from 'react';
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
import { EditRestaurnt } from '../api/restaurant';
import { handleStoreConfirm, handleCreateConfirm, handleStoreRestaurantInfo } from '../actions';
import "../styles/restaurantCreate.css";



const RestaurantEdit = ({dispatch, userinfo, restaurantinfo}) => {
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
    const [is_render, setIsRender] = useState(false);
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
        console.log("---active data", values);
        setActiveDays([...values]);
    }

    const getSeats = (values) => {
        setSeats(values);
    }

    const getCategories = (values) => {
        setCategories([...values]);
    }
    
    const handleUpdateRestaurant = async () => {
        console.log("---activeDays-----");
        console.log(activeDays);
        let updateRestaurantObj = {
            name: restaurantName,
            restaurantImg: imageValue,
            categories: categories,
            seats: seats,
            days: activeDays,
            userId: userinfo.userId,
            _id: restaurantinfo.restaurant._id
          };
          try {
            const is_created = await EditRestaurnt(updateRestaurantObj);
            if (is_created.success && is_created.data.result.status == 3) {
                dispatch(handleStoreConfirm(true));
                dispatch(handleCreateConfirm(false));
                setTimeout(() => {
                    navigate("/restaurantprofile");
                }, 2000);
            }
          } catch (error) {
            console.log("Error: ", error);
          }
    }

    const getRestaurantInfo = () => {
        if (restaurantinfo.restaurant.name == "" || restaurantinfo.restaurant.restaurantImg == "" ) {
            let getRetaurantInfo = JSON.parse(
                localStorage.getItem("restaurantInfo")
              );
            dispatch(handleStoreRestaurantInfo(getRetaurantInfo));
        }
        setRestaurantName(restaurantinfo.restaurant.name);
        setImageValue(restaurantinfo.restaurant.restaurantImg);
        setCategories([...restaurantinfo.restaurant.categories]);
        setSeats(restaurantinfo.restaurant.seats);
        setActiveDays([...restaurantinfo.restaurant.days]);
        console.log("---restaurnt informtion");
        console.log(restaurantinfo.restaurant.name, restaurantName)
        setIsRender(true)
    }

    useEffect(() => {
        getRestaurantInfo();
    },[])
    return (
        is_render?
        <div className="restaurant-profile-elements">
            <TitleComponent title="Edit Restaurant" />
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
                <ButtonComponent name="SAVE" onClickEvent={handleUpdateRestaurant} />
            </div>
            <Footer />
        </div>
        :""
    )
}

const mapStateToProps = state => ({
    userinfo: state.userinfo,
    restaurantinfo: state.restaurantinfo
})


export default connect(mapStateToProps)(RestaurantEdit);