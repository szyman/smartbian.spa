import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { userLogin } from '../../actions/userAction'
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

    login(values) {
        this.props.userLogin(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form className="form-inline my-2 my-lg-0"
                onSubmit={handleSubmit(this.login.bind(this))}
            >
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

export default reduxForm({
    validate,
    form: 'UserLoginForm'
})(
    connect(null, { userLogin })(UserLogin)
);