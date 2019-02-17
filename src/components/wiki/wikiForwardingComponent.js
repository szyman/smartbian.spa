import React, { Component } from 'react';

import ModalImage from '../modal/modalImageComponent';

import forwarding1 from '../../../assets/wiki/forwarding1.png';
import forwarding2 from '../../../assets/wiki/forwarding2.png';

class WikiForwarding extends Component {
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
                    <h3 className="text-center">Access Raspberry over internet</h3>
                    <p>Connect to your Raspberry Pi over the internet from another computer or a mobile device.</p>
                    <p>
                        To achive that you can set up port forwarding on your router.
                        To do this, you must change the configuration of your router to forward all inbound traffic from the internet on a specific port to the local IP address of your Raspberry Pi.
                        Most routers have this feature available. However, every router is different so you will need to consult your router's user manual for instructions.
                        It is important to setup a static ip address in the device that you are forwarding a port to. This ensures that your ports will remain open even after your device reboots.
                        This guide describes how to configure port forwarding on route Huawei HG8245Q.
                    </p>
                    <ol>
                        <li>
                            Login to your router. Your router has a web interface, so you will login to it using your web browser. By default the IP address for Huawei router is set to: 192.168.100.1.
                            After entering the IP address of your router you can simply login to your router configuration page.
                        </li>
                        <img
                            className="d-flex mb-2 mx-auto"
                            style={{ width: 50 + '%' }}
                            src={`../${forwarding1}`}
                            onClick={() => this.showModal(forwarding1, "Huawei welcome page")}
                        />
                        <li>
                            Now we need to find the port forwarding section in your router web page. Click the Forward Rules link near the top of the page.
                        </li>
                        <li>
                            The menu on the left should change. In this new menu, click Port Mapping Configuration.
                        </li>
                        <li>
                            Fill the following fields according to the bottom screenshot:
                            <ul>
                                <li>
                                    Internal Host: - ip address of your Raspberry connected to the local network.
                                    You can check in the Raspberry by typing <i className="font-weight-bold"> hostname -I </i> in the terminal
                                </li>
                                <li>External Source IP Address: - ip address assigned by DNS hosting. You can find a free dns hosting provider (<a href="https://www.google.com/search?q=free+dns">link</a>) and create your own ip address.</li>
                                <li>Internal port number: - port which will be accessible over the internet. It was set to 22 because this is a default port number for SSH. Do not change it.</li>
                                <li>External port number: - port which will be mapped to a specified number. Do not change it.</li>
                            </ul>
                        </li>
                        <img
                            className="d-flex mb-2 mx-auto"
                            style={{ width: 50 + '%' }}
                            src={`../${forwarding2}`}
                            onClick={() => this.showModal(forwarding2, "Setup forward rules")}
                        />
                    </ol>
                    <br />
                </div>
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

export default WikiForwarding;
