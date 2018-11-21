import React, { Component } from 'react';
import hljs from 'highlight.js';

class WikiLamp extends Component {
    componentDidMount() {
        hljs.highlightBlock(this.refs.highlight);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">Remote lamp switcher</h3>
                    <div ref="highlight">
                        <pre>
                            <code>
                                <p>
                                    import RPi.GPIO as GPIO<br />
                                    GPIOPin = 17
                                </p>
                                <p>
                                    GPIO.setwarnings(False)<br />
                                    GPIO.setmode(GPIO.BCM)<br />
                                    GPIO.setup(GPIOPin, GPIO.OUT)<br />
                                    statePin = GPIO.input(GPIOPin)<br />
                                </p>
                                <p>
                                    if (statePin is 1):<br />
                                    GPIO.output(GPIOPin, False)<br />
                                    print('Switched on')<br />
                                    else:<br />
                                    GPIO.output(GPIOPin, True)<br />
                                    print('Switched off')<br />
                                </p>
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default WikiLamp;