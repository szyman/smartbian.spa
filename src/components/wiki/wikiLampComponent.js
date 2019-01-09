import React, { Component } from 'react';
import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';

class WikiLamp extends Component {
    componentDidMount() {
        hljs.registerLanguage('python', python);
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
                                {`
import RPi.GPIO as GPIO
GPIOPin = 17

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIOPin, GPIO.OUT)
statePin = GPIO.input(GPIOPin)

if (statePin is 1):
	GPIO.output(GPIOPin, False)
	print('Switched on')
else:
	GPIO.output(GPIOPin, True)
	print('Switched off')
                                `}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default WikiLamp;