import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import App from './components/appComponent';
import UserRegister from './components/user/userRegisterComponent';
import Home from './components/home/homeComponent';
import { ErrorInterceptor } from './helpers/errorInterceptorHelper';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ErrorInterceptor();

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <App></App>
          <Switch>
            <Route path="/user/register" component={UserRegister} />
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  , document.querySelector('.container'));