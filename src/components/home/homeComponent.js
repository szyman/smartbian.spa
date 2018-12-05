import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
                        <div className="text-center">
                            <Link to="/user/register" className={`btn btn-primary btn-lg mr-2 ${this.props.userAuth.id ? 'd-none' : 'd-inline-block'}`}>Register</Link>
                            <a href="#details" className="btn btn-info btn-lg">Learn more</a>
                        </div>
                    </div>
                </section>

                <h3 className="text-center">Features and services</h3>
                <section id="details" className="d-flex flex-column flex-md-row">
                    <div className="d-flex flex-column align-items-center">
                        <div className="smart-home-img mb-2">
                            <a href="http://www.freepik.com">Designed by Freepik</a>
                        </div>
                        <p className="text-center">Using this application alows remote control your home automation.</p>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <div className="cloud-img">
                            <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>
                        </div>
                        <p className="text-center">Capabilities of the cloud computing solution allows us to establish comunination between this application and your Raspberry Pi.</p>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <div className="raspberry-img"></div>
                        <p className="text-center">Feel free to write any scripts in Python for your GPIO and execute them from any place you want.</p>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps)(Home);