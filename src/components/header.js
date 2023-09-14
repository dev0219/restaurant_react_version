import React, {useEffect} from 'react';
import { connect } from 'react-redux';


const Header = ({userinfo}) => {
    let localUserinfo = localStorage.getItem("userinfo");
    useEffect(() => {
        if (localUserinfo) {
            if (userinfo.userId == null) {
                
            }
        }

    },[localUserinfo])

    return (
        <div>
            {userinfo.userId && userinfo.userRole == 1  && <div>"mebmer header"</div>}
            {userinfo.userId && userinfo.userRole == 2  && <div>"restaurnt header"</div>}
        </div>
    )    
}

const mapStateToProps = state => ({
    userinfo: state.userinfo
})



export default connect(mapStateToProps)(Header);