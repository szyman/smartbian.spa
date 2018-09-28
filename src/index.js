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
import Setup from './components/setup/setupComponent';
import ControlPanel from './components/controlPanel/controlPanelComponent';
import UserList from './components/user/userListComponent';
import UserDetail from './components/user/userDetailComponent';
import UserEdit from './components/user/userEditComponent';

import { ErrorInterceptor } from './helpers/errorInterceptorHelper';
import PrivateRoute from './helpers/privateRouteHelper';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ErrorInterceptor();

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <App></App>
          <div className="container mt-5">
            <Switch>
              <PrivateRoute path='/setup' component={Setup}/>
              <PrivateRoute path='/controlPanel' component={ControlPanel} />
              <PrivateRoute path='/users/edit' component={UserEdit} />
              <PrivateRoute path='/users/:id' component={UserDetail} />
              <PrivateRoute path='/users' component={UserList} />
              <Route path='/user/register' component={UserRegister} />
              <Route path='/' component={Home}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  , document.querySelector('.container'));