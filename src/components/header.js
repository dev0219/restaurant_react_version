import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import MemberHeader from './MemberHeader';
import RestaurantHeader from './RestaurantHeader';
import { addUser } from '../actions';


const Header = ({dispatch, userinfo}) => {

    let localUserinfo = localStorage.getItem("userinfo");

    useEffect(() => {
        if (localUserinfo) {
            if (userinfo.userId == null) {
                let user = JSON.parse(localUserinfo);
                let userObj = {userId: user.userId, userRole: user.userRole};
                dispatch(addUser(userObj));
            }
        }
    },[localUserinfo])

    return (
        <div>
            {userinfo.userId && userinfo.userRole == 1  && <div><MemberHeader /></div>}
            {userinfo.userId && userinfo.userRole == 2  && <div><RestaurantHeader /></div>}
        </div>
    )    
}

const mapStateToProps = state => ({
    userinfo: state.userinfo
})

export default connect(mapStateToProps)(Header);