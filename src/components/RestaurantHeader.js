import React from 'react';
import { connect } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import { singoutUser } from '../api/auth';
import { addUser } from '../actions';
import "../styles/restaurantHeader.css"

const RestaurantHeader = ({dispatch, userinfo}) => {
    const navigate = useNavigate();
    const handleSignout = async () => {
        let userobj = { id: userinfo.userId };
        const is_singout = await singoutUser(userobj);
        if (is_singout.success) {
          localStorage.removeItem("userinfo");
          let userObj = {userId: null, userRole: null};
          dispatch(addUser(userObj));
          navigate("/");
        }
    }

    return (
        <div className='restaurant-header-elements'>
            <ButtonComponent name="Sign Out" onClickEvent={handleSignout} />
        </div>
    )    
}

const mapStateToProps = state => ({
    userinfo: state.userinfo
})



export default connect(mapStateToProps)(RestaurantHeader);