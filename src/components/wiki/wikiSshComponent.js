import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ModalImage from '../modal/modalImageComponent';

import sshEnableImg from '../../../assets/wiki/ssh_enable.png';
import sshKey from '../../../assets/wiki/ssh_key.png';

class WikiSsh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title: '',
            image: ''
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">Set up SSH connection</h3>
                    <h5>Enable SSH</h5>
                    <ol>
                        <li>Launch Raspberry Pi Configuration from the Preferences menu</li>
                        <li>Navigate to the Interfaces tab</li>
                        <li>Select Enabled next to SSH</li>
                        <li>Click OK</li>
                        <img
                            className="d-flex mb-2 mx-auto"
                            style={{ width: 50 + '%' }}
                            src={`../${sshEnableImg}`}
                            onClick={() => this.showModal(sshEnableImg, "Enable ssh in Raspbian")}
                        />
                    </ol>
                    <h5>Generate SSH key</h5>
                    <p>Puttygen is the SSH key generation tool for the linux version of PuTTY.</p>
                    <ol>
                        <li>
                            Install Puttygen:
                            <ul>
                                <li>sudo apt-get install putty</li>
                            </ul>
                        </li>
                        <li>
                            Enable public key authentication:
                            <ul>
                                <li>puttygen -t rsa -b 2048 -o mykey.ppk</li>
                            </ul>
                        </li>
                        <li>
                            Get the public key using:
                            <ul>
                                <li>puttygen -L mykey.ppk</li>
                            </ul>
                        </li>
                        <li>
                            Copy the public key to the .ssh/authorized_keys file on the Raspberry.
                        </li>
                        <img
                            className="d-flex mb-2 mx-auto"
                            style={{ width: 50 + '%' }}
                            src={`../${sshKey}`}
                            onClick={() => this.showModal(sshKey, "File authorized_keys in Raspbian")}
                        />
                        <li>
                            Generate the private key:
                            <ul>
                                <li>puttygen mykey.ppk -O private-openssh -o privatekey</li>
                            </ul>
                        </li>
                        <li>
                            Get the private key using:
                            <ul>
                                <li>cat privatekey</li>
                            </ul>
                        </li>
                        <li>
                            Copy the private key (including heading i.e. ----- ) to user settings in the Smartbian page located <Link to={`/users/${this.props.userAuth.id}/ssh`}>here</Link>.
                        </li>
                    </ol>
                    <br />
                </div>
                <br />
                <ModalImage
                    modal={this.state.modal}
                    hide={this.hideModal}
                    title={this.state.title}
                    image={this.state.image}>
                </ModalImage>
            </div>
        );
    }

    showModal(image, title) {
        this.setState({
            modal: true,
            image: image,
            title: title
        });
    }

    hideModal() {
        this.setState({
            modal: false,
            image: '',
            title: ''
        });
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps)(WikiSsh);
