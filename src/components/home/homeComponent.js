import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="home-content">
                    <h1>Find your match</h1>
                    <p className="lead">Come on in to view your matches... All you need to do is sign up!</p>
                    <div className="text-center">
                        <Link to="/user/register" className="btn btn-primary btn-lg mr-2">Register</Link>
                        <button className="btn btn-info btn-lg">Learn more</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;