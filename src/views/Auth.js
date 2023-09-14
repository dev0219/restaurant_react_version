import React, { useState } from 'react';
import TitleComponent from '../components/TitleComponent';
import InputTitleComponent from '../components/InputTitleComponent';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import "../styles/auth.css";


const Auth = ({dispatch}) => {

    const [username, setUserName] = useState('');

    const handleInputValueChange = (value) => {
        setUserName(value);
    };

    const handleLoginClick = () => {
        console.log("-- user name ");
        console.log(username);
        dispatch(addUser(username));
    };

    return (
    <div className="auth-elements">
        <TitleComponent title="Login" />
        <InputTitleComponent name="User Name" />
        <InputComponent onInputChange={handleInputValueChange} />
        <ButtonComponent name="LOGIN" onClickEvent={handleLoginClick} />
    </div>
    )    
}
export default connect()(Auth);