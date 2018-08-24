import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import createUser from '../../actions/userAction'
import { connect } from 'react-redux';

class UserLogin extends Component {
    renderField(field) {
        return (
            <input 
                className="form-control mr-sm-2"
                type={field.type}
                placeholder={field.placeholder}
                {...field.input}
            />            
        )
    }

    onSubmit(values) {
        console.log(values)
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="form-inline my-2 my-lg-0"
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
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
                <button className="btn btn-success my-2 my-sm-0" type="submit">Login</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'UserLoginForm'
})(
    connect(null, { createUser })(UserLogin)
);