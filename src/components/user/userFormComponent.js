import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.validateForm = this.validateForm.bind(this);
    }

    renderField(field) {
        return (
            <div>
                <input
                    className="form-control"
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
                {this.renderValidationError()}
                <h4>Raspberry PI host name:</h4>
                <Field
                    type="text"
                    placeholder="host name"
                    name="raspHost"
                    component={this.renderField}
                    validate={this.validateForm}
                />
                <h4>Raspberry PI User name:</h4>
                <Field
                    type="text"
                    placeholder="user name"
                    name="raspUsername"
                    component={this.renderField}
                    validate={this.validateForm}
                />
                <button className={`btn btn-success btn-block mt-2 mx-auto w-50 ${this.props.invalid ? 'disabled' : ''}`}>Save Changes</button>
                <br />
            </form>
        );
    }

    renderValidationError() {
        if (this.props.invalid) {
            return (
                <div className="row justify-content-md-center">
                    <div className="alert alert-info">
                        <strong>Information:</strong> You have made changes. Any unsaved changed will be lost!
                    </div>
                </div>
            )
        }
    }

    validateForm(value, property) {
        if (property.raspHost && property.raspUsername ) {
            return false;
        }

        return true;
    }
}

export default reduxForm({
    form: 'UserForm'
})(UserForm);
