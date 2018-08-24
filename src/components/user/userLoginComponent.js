import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { userLogin } from '../../actions/userAction';
import { connect } from 'react-redux';

class UserLogin extends Component {
    renderField(field) {
        return (
            <div>
                <input
                    className="form-control mr-sm-2"
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
            </div>
        )
    }

    renderForm() {
        if (this.loggedIn()) {
            return (
                <div className="dropdown">
                    <a className="dropdown-toggle text-light">
                        Welcome User
                    </a>

                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Edit Profile</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#"><i className="fa fa-sign-out"></i> Logout</a>
                    </div>
                </div>
            );
        } else {
            const { handleSubmit } = this.props;
            return (
                <form className="form-inline my-2 my-lg-0"
                    onSubmit={handleSubmit(this.login.bind(this))}>
                    <Field
                        type="text"
                        placeholder="Username"
                        name="username"
                        component={this.renderField}
                    />
                    <Field
                        type="password"
                        placeholder="Password"
                        name="password"
                        component={this.renderField}
                    />
                    <button className={`btn btn-success my-2 my-sm-0 ${this.props.invalid ? 'disabled': ''}`} type="submit">Login</button>
                </form>
            );
        }
    }

    render() {
        return (
            <div>
                { this.renderForm() }
            </div>
        );
    }

    login(values) {
        this.props.userLogin(values);
    }

    loggedIn() {
        if (this.props.user.token) {
            return true;
        }
        return false;
    }
}

function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = 'Empty field UserName';
    }
    if (!values.password) {
        errors.password = 'Empty field Password';
    }

    return errors;
}

function mapStateToProps({ user }) {
    return { user };
}

export default reduxForm({
    validate,
    form: 'UserLoginForm'
})(
    connect(mapStateToProps, { userLogin })(UserLogin)
);