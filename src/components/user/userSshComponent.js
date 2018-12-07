import React, { Component } from 'react';
import { userGetSshKey, userSaveSshKey } from '../../actions/userAction';

class UserSsh extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sshValue: '',
            showSaveButton: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {
        userGetSshKey(this.props.match.params.id).then(({ data }) => {
            this.setState({
                sshValue: data
            });
        });
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <div className="d-flex flex-column align-items-center">
                        <h3>SSH key</h3>
                        <textarea className="editScriptArea mb-2" value={this.state.sshValue} onChange={this.handleChange}></textarea>
                        <button className={`btn btn-success btn-block mx-auto w-50 ${this.state.showSaveButton ? 'visible' : 'invisible'}`} onClick={this.saveChanges}>
                            Save Changes
                        </button>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    handleChange(event) {
        this.setState({
            sshValue: event.target.value,
            showSaveButton: true
        })
    }

    saveChanges() {
        userSaveSshKey(this.props.match.params.id, this.state.sshValue).then(() => {
            this.setState({
                showSaveButton: false
            });
            console.log('Ssh saved');
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default UserSsh;