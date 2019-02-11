import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserFacebook from '../user/userFacebookComponent';

import demoGif from '../../../assets/demo.gif'

class Home extends Component {
    render() {
        return (
            <div>
                <section className="home">
                    <div className="background-image"></div>
                    <div className="home-content-area text-center">
                        <h1>Smartbian</h1>
                        <p>Control your smart modules working on Raspberry Pi from one place...</p>
                        <p className={`${this.props.userAuth.id ? 'd-none' : 'd-block'}`}>All you need to do is sign up!</p>
                        <div className={`text-center mb-2 ${this.props.userAuth.id ? 'd-none' : 'd-inline-block'}`}>
                            <Link to="/user/register" className="btn btn-primary btn-lg mr-2">Register</Link>
                            <UserFacebook />
                        </div>
                        <a href="#details" className="btn btn-info btn-lg">Learn more</a>
                    </div>
                </section>

                <section className="container" id="details">
                    <h3 className="text-center">Features and services</h3>
                    <div className="d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column align-items-center mx-2">
                            <div className="smart-home-img">
                                <a href="http://www.freepik.com">Designed by Freepik</a>
                            </div>
                            <p className="text-center">With this application you can remotely control home automation.</p>
                        </div>

                        <div className="d-flex flex-column align-items-center mx-2">
                            <div className="cloud-img">
                                <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>
                            </div>
                            <p className="text-center">Capabilities of the cloud computing solution allows us to establish comunination between this application and your Raspberry Pi.</p>
                        </div>

                        <div className="d-flex flex-column align-items-center mx-2">
                            <div className="raspberry-img"></div>
                            <p className="text-center">Feel free to write any scripts in Python for your GPIO and execute them from any place you want.</p>
                        </div>
                    </div>

                    <h3 className="text-center mt-2">How it works</h3>
                    <p className="mx-2">
                        You can make completely universal and very cheap Home Automation control panel using a Raspberry Pi 3. The following example describes how to use Smartbian to turn the lamp on/off by your Raspberry Pi.
                    </p>
                    <img className="d-block mx-auto mb-2 mw-100" src={demoGif} alt="Smartbian demo" />
                </section>
            </div>
        );
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps)(Home);