import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import StoreConfirmComponent from '../components/StoreConfirmComponent';
import DeleteConfirmComponent from '../components/DeleteConfirmComponent';
import ButtonComponent from '../components/ButtonComponent';
import TitleComponent from '../components/TitleComponent';
import DelButtonComponent from '../components/DelButtonComponent';
import UserRestaurantListComponent from '../components/UserRestaurantListComponent';
import Footer from '../components/footer';
import { getUserRestaurnts, deleteRestaurnt } from "../api/restaurant";
import { deletetProfile } from '../api/auth';
import { connect } from 'react-redux';
import { handleStoreConfirm, addUser } from '../actions';
import "../styles/restaurantProfile.css";


const RestaurantProfile = ({dispatch,userinfo,restaurantinfo}) => {
    const navigate = useNavigate();
    let localUserinfo = localStorage.getItem("userinfo");

    const [is_deleting, setIsDeleting] = useState(false);
    const [is_created, setIsCreated] = useState(false);
    const [deletecontent, setDeleteContent] = useState("Are you deleting this retaurant?");
    const [RestaurantStorecontent, setStoreContent] = useState("The restaurant was created successfully!");
    const [restaurants, setRestaurants] = useState([]);
    const [delete_restaurant_id, setDeleteRestaurantId] = useState("");


    const handleCreateRestaurant = () => {
        navigate("/create-restaurant");
    }

    const DeleteRestaurant = (restaurantId) => {
        setIsDeleting(true);
        setDeleteRestaurantId(restaurantId);
    }

    const handleDeleteProfile = () => {
        setIsDeleting(true);
        setDeleteRestaurantId("");
        setDeleteContent("Are you deleting the profile?");
    }

    const handleDeleteConfirm = async () => {
        if(delete_restaurant_id != "") {
            let deleteObj = { _id: delete_restaurant_id };
            let deleted_restaurant = await deleteRestaurnt(deleteObj);
            if (deleted_restaurant.data.result.status == 4) {
                setIsDeleting(false);
                getUserRestaurantsLst();
            }
        } else {
            let deletedUser = { id: userinfo.userId };
            const deleted_profile = await deletetProfile(deletedUser);
            if (deleted_profile.data.result.status == 4) {
                let userObj = {userId: null, userRole: null};
                dispatch(addUser(userObj))
                localStorage.removeItem("userinfo");
                navigate("/");
            }
        }
    }

    const handleCancelConfirm = () => {
        setIsDeleting(false);
        setDeleteRestaurantId("");
    }

    const getUserRestaurantsLst = async () => {
        if (localUserinfo) {
            if (userinfo.userId == null) {
                let user = JSON.parse(localUserinfo);
                let userObj = {userId: user.userId, userRole: user.userRole};
                dispatch(addUser(userObj));
            }
        }
        let userobj = { userId: userinfo.userId };
        const restaurantLst = await getUserRestaurnts(userobj);
        setRestaurants([...restaurantLst.data.results.results])
    }

    useEffect(() => {
        getUserRestaurantsLst();
        if (restaurantinfo.storeConfirm) {
            if (restaurantinfo.is_created) {
                setStoreContent("The restaurant was created successfully!");
            } else {
                setStoreContent("The restaurant was updated successfully!");
            }
            setIsCreated(true);
            setTimeout(() => {
                setIsCreated(false);
                dispatch(handleStoreConfirm(false))
            }, 3000);

        }
    }, [])

    return (
        <div className="restaurant-profile-elements">
            {is_deleting && <DeleteConfirmComponent content={deletecontent}  onClickConfirmEvent={handleDeleteConfirm} onClickCancelEvent={handleCancelConfirm}/>}
            {is_created && <StoreConfirmComponent Storecontent={RestaurantStorecontent}/>}
            <TitleComponent title="Restaurant Profile" />
            <div className="profile-delete">
                <ButtonComponent name="Create Restaurant" onClickEvent={handleCreateRestaurant} />
                <DelButtonComponent name="Profile Delete" onClickEvent={handleDeleteProfile} />
            </div>
            {restaurants.length? 
                <UserRestaurantListComponent restaruntArr={restaurants} DelRestaurant={DeleteRestaurant} />:''
            }
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    userinfo: state.userinfo,
    restaurantinfo: state.restaurantinfo
})


export default connect(mapStateToProps)(RestaurantProfile);