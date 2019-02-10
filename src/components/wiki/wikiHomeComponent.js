import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WikiHome extends Component {
    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">How to start</h3>
                    <p>
                        This application will help you build very cheap home automation system! It allows you to comunnitate with Raspberry Pi over internet.
                    </p>
                    <p>
                        <i className="font-weight-bold">Please be careful!</i> Messing around with electricity that comes directly from your wall socket is very dangerous and can result in a serious injury.
                    </p>
                    <h5>To start building a home automation do the following steps:</h5>
                    <ol>
                        <li>Buy a Raspberry Pi 3 Model B - <a href="https://www.amazon.com/Raspberry-Pi-RASPBERRYPI3-MODB-1GB-Model-Motherboard/dp/B01CD5VC92">amazon.com</a></li>
                        <li>Download Raspian system - <a href="https://www.raspberrypi.org/downloads/raspbian/">Raspian</a></li>
                        <li>Install Raspian on microSD card - <a href="https://www.raspberrypi.org/documentation/installation/installing-images/README.md">Installation guide</a></li>
                        <li>Insert microSD card to your Raspberry and turn it on.</li>
                    </ol>

                    <p>
                        Move to the next section - <Link to={`/wiki/ssh`}>Set up SSH connection</Link>
                    </p>
                    <br />
                </div>
                <br />
            </div>
        );
    }
}

export default WikiHome;
