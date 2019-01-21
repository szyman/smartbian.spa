import React, { Component } from 'react';
import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';

class WikiLight extends Component {
    componentDidMount() {
        hljs.registerLanguage('python', python);
        hljs.highlightBlock(this.refs.highlight);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">Remote lamp switcher</h3>
                    <p>Important Components:</p>
                    <ul>
                        <li>Raspberry Pi Model 3</li>
                        <li>
                            Relay Channel Module Boards - you can buy it at <a href="https://www.amazon.com/SunFounder-Channel-Optocoupler-Expansion-Raspberry/dp/B00E0NTPP4/ref=pd_lpo_vtph_147_lp_t_2?_encoding=UTF8&psc=1&refRID=HKAWHGC30RA17S93497N">amazon.com</a>
                        </li>
                        <li>
                            Raspberry Pi Jumper Cables - you can buy it at <a href="https://www.amazon.com/Aukru-20cm-Breadboard-Arduino-Raspberry/dp/B019SX71TC/ref=sr_1_5?keywords=Female+to+Female+Breadboard+Jumper&qid=1548069482&s=Electronics&sr=1-5">amazon.com</a>
                        </li>
                    </ul>
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
                    <br/>
                </div>
            </div>
        );
    }
}

export default WikiLight;
