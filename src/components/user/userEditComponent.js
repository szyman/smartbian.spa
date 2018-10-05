import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userGetDetails, userUpdate } from '../../actions/userAction';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        this.props.userGetDetails(this.props.userAuth.id);
    }

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

    validateForm(value, property) {
        if (property.raspHost !== this.props.userDetails.raspHost ||
            property.raspUsername !== this.props.userDetails.raspUsername ) {
                return false;
        }

        return true;
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

    render() {
        if (!this.props.userDetails) {
            return <div></div>;
        }

        const { handleSubmit } = this.props;
        const { userDetails } = this.props;

        return (
            <div>
                { this.renderValidationError() }

                <div className="row justify-content-md-center text-center">
                    <div className="">
                        <h1>Edit profile</h1>
                        <form onSubmit={handleSubmit(this.updateUser.bind(this))}>
                            <h4>Raspberry PI host name: {userDetails.raspHost}</h4>
                            <Field
                                type="text"
                                placeholder="host name"
                                name="raspHost"
                                component={this.renderField}
                                validate={this.validateForm}
                            />
                            <h4>Raspberry PI User name: {userDetails.raspUsername}</h4>
                            <Field
                                type="text"
                                placeholder="user name"
                                name="raspUsername"
                                component={this.renderField}
                                validate={this.validateForm}
                            />
                            <br/>
                            <button className={`btn btn-success btn-block ${this.props.invalid ? 'disabled': ''}`}>Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    updateUser(values) {
        this.props.userUpdate(this.props.userAuth.id, values).then(() => {
            console.log('User updated');
        });
    }
}

function mapStateToProps({ userAuth, userList }) {
    return { userAuth, userDetails: userList[userAuth.id] };
}

export default reduxForm({
    form: 'UserEditForm'
})(connect(mapStateToProps, { userGetDetails, userUpdate })(UserEdit))