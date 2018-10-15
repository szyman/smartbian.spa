import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { userGetDetails } from '../../actions/userAction';

class ModalConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.userGetDetails(this.props.userAuth.id);
    }

    render() {
        return (
            <div>
                <Button color="info" className={this.props.buttonClassName} onClick={this.toggle}>
                    {this.props.buttonTitle}
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        {this.props.headerTitle}
                    </ModalHeader>
                    <form onSubmit={this.props.handleSubmit((value) => this.props.submitAction(value, this.props.connectionValues))}>
                        <ModalBody>
                            <div className="form-group">
                                <label>Password</label>
                                <Field name="password" component="input" type="password" className="form-control" placeholder="Password" />
                            </div>
                            <button className="btn btn-success btn-block mb-2" onClick={this.toggle}>OK</button>
                        </ModalBody>
                    </form>
                </Modal>
            </div>
        );
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
}

function mapStateToProps({ userAuth, userList }) {
    let connectionValues = {};
    const userDetails = userList[userAuth.id];
    if (!_.isEmpty(userDetails)) {
        connectionValues = {
            host: userDetails.raspHost,
            username: userDetails.raspUsername,
            password: null
        };
    }

    return { userAuth, connectionValues };
}

export default reduxForm({
    form: 'ModalConnectionForm',
    initialValues: {
        password: ''
    }
})(connect(mapStateToProps, { userGetDetails })(ModalConnection));