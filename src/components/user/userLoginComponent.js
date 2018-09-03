import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { userLogin, userLogout, userRestore } from '../../actions/userAction';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {
        this.props.userRestore();
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

    renderForm() {
        if (this.loggedIn()) {
            return (
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle className="text-light" caret>
                        Welcome
                        <a className="capitalize-label"> {this.props.user.username}</a>
                    </DropdownToggle>

                    <DropdownMenu className="mt-3">
                        <DropdownItem href="#"><i className="fa fa-user"></i> Edit Profile</DropdownItem>
                        <div className="dropdown-divider"></div>
                        <DropdownItem onClick={this.logout}><i className="fa fa-sign-out-alt"></i> Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
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
        const { userLogin, reset } = this.props;
        userLogin(values).then(() => {
            reset();
          });;
    }

    loggedIn() {
        if (this.props.user.username) {
            return true;
        }
        return false;
    }

    logout(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        this.props.userLogout();
        console.log('logged out');
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
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
    connect(mapStateToProps, { userLogin, userLogout, userRestore })(UserLogin)
);