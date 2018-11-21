import React, { Component } from 'react';
import hljs from 'highlight.js';

class WikiTemperature extends Component {
    componentDidMount() {
        hljs.highlightBlock(this.refs.highlight);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">Temperature sensor</h3>
                    <div ref="highlight">
                        <pre>
                            <code>
                                <p>
                                    import w1thermsensor
                                </p>
                                <p>
                                    sensor = w1thermsensor.W1ThermSensor()<br/>
                                    temp = sensor.get_temperature()<br/>
                                    print(temp)<br/>
                                </p>
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default WikiTemperature;