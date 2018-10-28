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

            <section id="details">
                <h3 className="text-center">Kocham Ole</h3>
            </section>
            </div>
        );
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps)(Home);