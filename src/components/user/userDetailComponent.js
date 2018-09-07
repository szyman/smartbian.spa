import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userGetDetails } from '../../actions/userAction';

class UserDetail extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.userGetDetails(id);
    }

    renderUsers() {
        if (_.isEmpty(this.props.userDetails)) {
            return;
        }

        return(
            <div className="center-block">
                <p>
                    Id: {this.props.userDetails.id}
                </p>
                <p>
                    Username: {this.props.userDetails.username}
                </p>
                <p>
                    Raspberry PI host name: {this.props.userDetails.raspHost}
                </p>
                <p>
                    Raspberry PI User name: {this.props.userDetails.raspUsername}
                </p>
                <p>
                    Blocks ammount: {this.props.userDetails.blocks && this.props.userDetails.blocks.length}
                </p>
            </div>
        )
    }

    render() {
        return(
            <div className="container text-center">
                <h1 className="mt-5">User details</h1>
                {this.renderUsers()}
            </div>
        );
    }
}

function mapStateToProps({ userList }, ownProps) {
    return { userDetails: userList[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { userGetDetails })(UserDetail)