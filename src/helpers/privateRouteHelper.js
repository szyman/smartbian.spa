import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import _ from 'lodash';

import Home from '../components/home/homeComponent';

class PrivateRoute extends Component {
    render() {
        if (_.isEmpty(this.props.userAuth)) {
            return(
                <Route path='/' component={Home}/>
            );
        } else {
            return(
                <Route path={this.props.path} component={this.props.component}/>
            );
        }
    }
}

function mapStateToProps({ userAuth }){
    return { userAuth };
}

export default connect(mapStateToProps)(PrivateRoute);