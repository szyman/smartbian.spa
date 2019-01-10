import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { userRegister } from '../../actions/userAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class UserRegister extends Component {
    renderField(field) {
        let { touched, error, invalid } = field.meta;
        return (
            <div className={`form-group row justify-content-md-center ${touched && invalid ? 'has-danger' : ''}`}>
                <label className="col-md-2 text-center font-weight-bold">{field.placeholder}</label>
                <input
                    className="form-control"
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="background-content">
                <div className="container content-background">
                    <form onSubmit={handleSubmit(this.register.bind(this))}>
                        <h2 className="text-center text-primary">Sign Up</h2>
                        <hr />

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
                        <Field
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            component={this.renderField}
                        />
                        <div className="form-group text-center">
                            <button className="btn btn-success" type="submit">Register</button>
                            <Link to="/" className="btn btn-default" type="button">Cancel</Link>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        );
    }

    register(values) {
        this.props.userRegister(values).then(() => {
            this.props.history.push('/');
        });
    }
}

function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = 'Empty field UserName';
    }
    if (_.size(values.username) < 3) {
        errors.username = "Must include at leat 3 characters";
    }
    if (!values.password) {
        errors.password = 'Empty field Password';
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password doesn\'t match';
    }

    return errors;
}


export default withRouter(reduxForm({
    validate,
    form: 'UserRegisterForm'
})(
    connect(null, { userRegister })(UserRegister)
));