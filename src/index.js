import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import UserList from './components/user';
import rootReducer from './reducers';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import ItemsList from './components/ItemsList';
import './index.css';
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/list" element={<ItemsList />} />
                <Route exact path="/users" element={<UserList />} />
            </Routes>            
        </Router>
    </Provider>, 
    document.getElementById('root')
);