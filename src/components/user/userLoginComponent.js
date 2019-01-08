import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { userLogin, userLogout, userRestore } from '../../actions/userAction';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import ModalMessage from '../modal/modalMessageComponent';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.toggle = this.toggle.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {
            dropdownOpen: false,
            showLoginModal: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        this.props.userRestore();
    }

    renderField(field) {
        return (
            <div className="mr-1">
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
                        Welcome {this.props.userAuth.username}
                    </DropdownToggle>
                    <DropdownMenu className="mt-3">
                        <Link to='/users/edit'>
                            <DropdownItem>
                                <i className="fa fa-user"></i>
                                Edit Profile
                            </DropdownItem>
                        </Link>
                        <Link to={`/users/${this.props.userAuth.id}/ssh`}>
                            <DropdownItem>
                                <i className="fas fa-key"></i>
                                SSH Key
                            </DropdownItem>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <DropdownItem onClick={this.logout}><i className="fa fa-sign-out-alt"></i> Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
        } else {
            const { handleSubmit } = this.props;
            return (
                <form className="d-flex"
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
                <ModalMessage
                    modal={this.state.showLoginModal}
                    toggle={this.hideModal}
                    title={'Login error'}
                    message={this.state.errorMessage}>
                </ModalMessage>
            </div>
        );
    }

    hideModal() {
        this.setState({
            dropdownOpen: false,
            showLoginModal: false,
            errorMessage: ''
        }
      );
    }

    login(values) {
        const { userLogin, reset } = this.props;
        userLogin(values).then(() => {
            reset();
          }).catch((error) => {
              this.setState({
                    dropdownOpen: false,
                    showLoginModal: true,
                    errorMessage: error
                }
              );
          });
    }

    loggedIn() {
        if (this.props.userAuth.username) {
            return true;
        }
        return false;
    }

    logout(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        this.props.userLogout();
        this.props.history.push('/');
        console.log('logged out');
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen,
            showLoginModal: false,
            errorMessage: ''
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

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default withRouter(reduxForm({
    validate,
    form: 'UserLoginForm'
})(
    connect(mapStateToProps, { userLogin, userLogout, userRestore })(UserLogin)
));