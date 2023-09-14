import React from 'react'
import { connect } from 'react-redux';

const MemberProfile = ({userinfo}) => (
    <div>{userinfo.userId} {userinfo.userRole}</div>
)

const mapStateToProps = state => ({
    userinfo: state.userinfo
})

export default connect(mapStateToProps)(MemberProfile);