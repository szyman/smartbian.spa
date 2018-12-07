import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import reducers from './reducers';
import App from './components/appComponent';
import UserRegister from './components/user/userRegisterComponent';
import Home from './components/home/homeComponent';
import WikiLamp from './components/wiki/wikiLampComponent';
import WikiHome from './components/wiki/wikiHomeComponent';
import WikiTemperature from './components/wiki/wikiTemperatureComponent';
import WikiPrivatePolicy from './components/wiki/wikiPrivatePolicyComponent';
import ControlPanel from './components/controlPanel/controlPanelComponent';
import UserList from './components/user/userListComponent';
import UserDetail from './components/user/userDetailComponent';
import UserEdit from './components/user/userEditComponent';
import UserSsh from './components/user/userSshComponent';
import ItemEdit from './components/item/itemEditComponent';
import ItemScript from './components/item/itemScriptComponent';

import { ErrorInterceptor } from './helpers/errorInterceptorHelper';
import PrivateRoute from './helpers/privateRouteHelper';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ErrorInterceptor();

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <App></App>
                <div>
                    <Switch>
                        <PrivateRoute path='/wiki/lamp' component={WikiLamp} />
                        <PrivateRoute path='/wiki/temperature' component={WikiTemperature} />
                        <PrivateRoute path='/wiki/privatePolicy' component={WikiPrivatePolicy} />
                        <PrivateRoute path='/wiki' component={WikiHome} />
                        <PrivateRoute path='/controlPanel/items/:id/script' component={ItemScript} />
                        <PrivateRoute path='/controlPanel/items/:id' component={ItemEdit} />
                        <PrivateRoute path='/controlPanel' component={ControlPanel} />
                        <PrivateRoute path='/users/:id/ssh' component={UserSsh} />
                        <PrivateRoute path='/users/edit' component={UserEdit} />
                        <PrivateRoute path='/users/:id' component={UserDetail} />
                        <PrivateRoute path='/users' component={UserList} />
                        <Route path='/user/register' component={UserRegister} />
                        <Route path='/' component={Home} />
                    </Switch>
                </div>
                <footer className="card-footer text-muted">
                    &copy; Marek Szymanski
                    <Link to='/wiki/privatePolicy'> Private policy</Link>
                </footer>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.app'));