import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {userRegister} from '../../actions/userAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserRegister extends Component {
    renderField(field) {
        return (
            <div className="form-group">
                <input
                    className="form-control"
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={ handleSubmit(this.register.bind(this)) }>
                <h2 className="text-center text-primary">Sign Up</h2>
                <hr/>

                <Field
                    type="text"
                    placeholder="Username"
                    name="username"
                    component={this.renderField}
                />
                <Field
                    type="text"
                    placeholder="Password"
                    name="password"
                    component={this.renderField}
                />
                <div className="form-group text-center">
                    <button className="btn btn-success" type="submit">Register</button>
                    <Link to="/" className="btn btn-default" type="button">Cancel</Link>
                </div>
            </form>
        );
    }

    register(values) {
        this.props.userRegister(values);
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
    form: 'UserRegisterForm'
})(
    connect(null, { userRegister })(UserRegister)
);