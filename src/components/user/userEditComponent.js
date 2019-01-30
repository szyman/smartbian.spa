import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userGetDetails, userUpdate } from '../../actions/userAction';
import UserForm from './userFormComponent';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        //TODO: use params this.props.match.params.id
        this.props.userGetDetails(this.props.userAuth.id);
    }

    render() {
        if (!this.props.userDetails) {
            return <div></div>;
        }

        return (
            <div className="background-content">
                <div className="container content-background">
                    <div className="align-self-center text-center">
                        <div className="">
                            <h1>Edit profile</h1>
                            <UserForm initialValues={_.pick(this.props.userDetails, 'raspHost', 'raspUsername')} onSubmit={this.updateUser} />
                        </div>
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

export default connect(mapStateToProps, { userGetDetails, userUpdate })(UserEdit)
