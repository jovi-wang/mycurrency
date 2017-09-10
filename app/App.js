
import React, { Component } from 'react';
import Country from './components/Country';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';
import logger from './middlewares/logger';


export default class App extends Component {

    render() {
        const store = createStore(reducer,applyMiddleware(ReduxThunk,logger));
        return (
            <Provider store={store}>
                <Country/>
            </Provider>
        );
    }
}
