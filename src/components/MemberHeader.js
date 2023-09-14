import React from 'react';
import { connect } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import { singoutUser } from '../api/auth';
import "../styles/memberHeader.css"

const RestaurantHeader = ({userinfo}) => {
    const navigate = useNavigate();
    const handleSignout = async () => {
        let userobj = { id: userinfo.userId };
        const is_singout = await singoutUser(userobj);
        if (is_singout.success) {
          localStorage.removeItem("userinfo");
          navigate("/");
        }
    }

    return (
        <div class="member-header-elements">
            <ButtonComponent name="Sign Out" onClickEvent={handleSignout} />
            <ButtonComponent
            name="Restaurants"
            onClickEvent={navigate("/memberrestaurants")}
            />
            <ButtonComponent name="Profile" onClickEvent={navigate("/memberprofile")} />
        </div>
    )    
}

const mapStateToProps = state => ({
    userinfo: state.userinfo
})



export default connect(mapStateToProps)(RestaurantHeader);