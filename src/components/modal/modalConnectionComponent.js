import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { userGetDetails } from '../../actions/userAction';
import { controlPanelTest } from '../../actions/controlPanelAction';

class ModalConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.testConnection = this.testConnection.bind(this);
    }

    componentDidMount() {
        this.props.userGetDetails(this.props.userAuth.id);
    }

    render() {
        return (
            <div>
                <Button color="info" className="mr-1" onClick={this.toggle}>Test connection</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Test connection</ModalHeader>
                    <form onSubmit={this.props.handleSubmit(this.testConnection)}>
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

    testConnection(values) {
        const connectionValues = {
            host: this.props.userDetails.raspHost,
            username: this.props.userDetails.raspUsername,
            password: values.password
        };

        this.props.controlPanelTest(connectionValues).then(({ payload }) => {
            console.log(`Test connetion result: ${payload.data}`);
        });
    }
}

function mapStateToProps({ userAuth, userList }) {
    return { userAuth, userDetails: userList[userAuth.id] };
}

export default reduxForm({
    form: 'ModalConnectionForm'
})(connect(mapStateToProps, { userGetDetails, controlPanelTest })(ModalConnection));