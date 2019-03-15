import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userLoginExtProvider } from '../../actions/userAction';

class UserFacebook extends Component {
    constructor(props) {
        super(props);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.fbLoginData = this.fbLoginData.bind(this);
    }

    componentDidMount() {
        window.fbAsyncInit = () => {
            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v3.2&appId=246321682957406&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        return (
            <div className='btn btn-primary btn-lg' onClick={this.loginFacebook}>Log in With Facebook</div>
        );
    }

    loginFacebook() {
        const that = this;
        FB.login((response) => {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                that.fbLoginData();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    fbLoginData() {
        const that = this;
        FB.api('/me', { fields: 'id, name' }, (response) => {
            console.log('Good to see you', response.name);
            that.props.userLoginExtProvider({
                username: response.name,
                password: response.id
            });
        });
    }
}

export default connect(null, { userLoginExtProvider })(UserFacebook);
