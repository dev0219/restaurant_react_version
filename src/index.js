import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import UserList from './components/user';
import rootReducer from './reducers';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import ItemsList from './components/ItemsList';
import MemberProfile from './views/MemberProfile';
import MemberReservation from './views/MemberReservation';
import MemberRestaurants from './views/MemberRestaurants';
import RestaurantCreate from './views/RestaurantCreate';
import RestaurantEdit from './views/RestaurantEdit';
import RestaurantProfile from './views/RestaurantProfile';
import Header from './components/header';
// import './index.css';
import Auth from './views/Auth';
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            {/* <Header /> */}
            <Routes>
                <Route exact path="/" element={<Auth />} />
                <Route exact path="/memberprofile" element={<MemberProfile />} />
                <Route exact path="/memberrestaurants" element={<MemberRestaurants />} />
                <Route exact path="/bookreservation" element={<MemberReservation />} />
                <Route exact path="/restaurantprofile" element={<RestaurantProfile />} />
                <Route exact path="/create-restaurant" element={<RestaurantCreate />} />
                <Route exact path="/edit-restaurant" element={<RestaurantEdit />} />
            </Routes>            
        </Router>
    </Provider>, 
    document.getElementById('root')
);