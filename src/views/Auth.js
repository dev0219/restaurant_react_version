import React, { useState } from 'react';
import TitleComponent from '../components/TitleComponent';
import { useNavigate } from 'react-router-dom';
import InputTitleComponent from '../components/InputTitleComponent';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import ConfirmMessageComponent from '../components/ConfirmMessageComponent';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import { loginUser } from '../api/auth';
import "../styles/auth.css";


const Auth = ({dispatch}) => {

    const [username, setUserName] = useState('');
    const [islogin, setCheckLogin] = useState(false);
    const [confirmstatus, setConfirmStatus] = useState("");
    const navigate = useNavigate();
    const handleInputValueChange = (value) => {
        setUserName(value);
    };

    const handleLoginClick = async () => {
        console.log("-- user name ");
        console.log(username);
        try {
            const userdata = { username: username };
            const loginResult = await loginUser(userdata);
            setCheckLogin(true);
            if (loginResult.success && loginResult.data) {
                if (loginResult.data.result.status == 1) {
                    setConfirmStatus("Currently, someone logined with your username already.")
                } else if (loginResult.data.result.status == 2) {
                    setConfirmStatus("Login Successfully!")
                    let userObj = {userId: loginResult.data.result.id, userRole: loginResult.data.result.role};
                    dispatch(addUser(userObj));
                    localStorage.setItem("userinfo", JSON.stringify(userObj));
                    if (loginResult.data.result.role == 2) {
                      navigate('/restaurantprofile');
                    } else {
                      navigate('/memberprofile');
                    }
                } else if (loginResult.data.result.status == 3) {
                    setConfirmStatus("You are new user in this system!")
                    let userObj = {userId: loginResult.data.result.id, userRole: loginResult.data.result.role};
                    dispatch(addUser(userObj));
                    localStorage.setItem("userinfo", JSON.stringify(userObj));
                    if (loginResult.data.result.role == 2) {
                      navigate('/restaurantprofile');
                    } else {
                      navigate('/memberprofile');
                    }
                }
            }

        } catch (error) {
            console.log("login err: ",error);
            setCheckLogin(false);
        }
    };

    return (
    <div className="auth-elements">
        <TitleComponent title="Login" />
        <InputTitleComponent name="User Name" />
        <InputComponent value={username} onInputChange={handleInputValueChange} />
        <ButtonComponent name="LOGIN" onClickEvent={handleLoginClick} />
        {islogin?<ConfirmMessageComponent content={confirmstatus} />:''}
    </div>
    )    
}
export default connect()(Auth);