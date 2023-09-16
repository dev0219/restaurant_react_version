import React, {useEffect, useState} from 'react';
import StoreConfirmComponent from '../components/StoreConfirmComponent';
import DeleteConfirmComponent from '../components/DeleteConfirmComponent';
import TitleComponent from '../components/TitleComponent';
import ReservedRestaurantComponent from '../components/ReservedRestaurantComponent';
import Footer from '../components/footer';
import { getUserReservations, deleteReservation } from "../api/reservation";
import { handleStoreConfirm } from '../actions';
import "../styles/memberProfile.css";

import { connect } from 'react-redux';

const MemberProfile = ({dispatch, userinfo, restaurantinfo, }) => {
    const [is_reserved, setIsReserved] = useState(false);
    const [is_deleting, setIsDeleted] = useState(false);
    const [reservedRestaurants, setReservedRestaurants] = useState([]);
    const [deleting_reserve_id, setDeleteReserveId] = useState("");

    const handleDelete = (val) => {
        setIsDeleted(true);
        setDeleteReserveId(val);
    }

    const handleDeleteConfirm = async () => {
        setIsDeleted(false);
        let deletedre = { _id: deleting_reserve_id };
        const is_deleted = await deleteReservation(deletedre);
        if (is_deleted.data.result.status == 4) {
            getAllRestaurants();
        }
    }

    const handleCancelConfirm = () => {
        setDeleteReserveId("");
        setIsDeleted(false);
    }

    const getAllRestaurants = async () => {
        let userobject = { userId: userinfo.userId };
        const allRestaurantLst = await getUserReservations(userobject);
        setReservedRestaurants([...allRestaurantLst.data.results.results])
    }

    useEffect(() => {
        getAllRestaurants();
        if (restaurantinfo.storeConfirm) {
            setIsReserved(true);
            setTimeout(() => {
                setIsReserved(false);
                dispatch(handleStoreConfirm(false));
            }, 3000);
        }
    }, [])

    return (
        <div className="member-profile-elements">
            {is_reserved && <StoreConfirmComponent Storecontent="The restaurant was reserved successfully!" />}
            {is_deleting && <DeleteConfirmComponent content="Are you deleting this reservation?" onClickConfirmEvent={handleDeleteConfirm} onClickCancelEvent={handleCancelConfirm}/>}
            <TitleComponent title="Member Profile" />
            {reservedRestaurants.map((res, index) => {
                return (
                    <div key={index}>
                        <ReservedRestaurantComponent name={res.name} date={res.date} seats={res.seats} id={res._id} onClickEvent={handleDelete} />
                    </div>
                )                
            })}
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    userinfo: state.userinfo,
    restaurantinfo: state.restaurantinfo
})

export default connect(mapStateToProps)(MemberProfile);