import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userGetList } from '../../actions/userAction';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.props.userGetList();
    }

    renderUsers() {
        if (_.isEmpty(this.props.userList)) {
            return
        }
        return _.map(this.props.userList, user => {
            return (
                <li className="list-group-item" key={user.id}>
                    {user.username}
                    <Link to={`/users/${user.id}`}>Show</Link>
                </li>
            );
        });
    }

    render() {
        return(
            <div className="row justify-content-md-center text-center">
                <ul className="list-group">
                    {this.renderUsers()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ userList }) {
    return { userList };
}

export default connect(mapStateToProps, { userGetList })(UserList)