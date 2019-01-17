import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import sshEnableImg from '../../../assets/wiki/ssh_enable.png';

class WikiSsh extends Component {
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
                    </ol>
                    <img className="mb-2" style={{ width: 100 + '%' }} src={`../${sshEnableImg}`}/>
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
                    <h5></h5>
                    <br/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps)(WikiSsh);
