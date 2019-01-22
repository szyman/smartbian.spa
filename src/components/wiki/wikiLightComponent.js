import React, { Component } from 'react';
import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';

import gpioLight from '../../../assets/wiki/gpio_light.png';

class WikiLight extends Component {
    componentDidMount() {
        hljs.registerLanguage('python', python);
        hljs.highlightBlock(this.refs.highlight);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">Remote light switcher</h3>
                    <h5>Wiring up</h5>
                    <p>Important Components:</p>
                    <ul>
                        <li>Raspberry Pi Model 3</li>
                        <li>
                            Relay Channel Module Boards - Raspberry Pi cannot turn the light on by itself, so we use a relay switch to simple break the circuit when we want the light off and then connect the circuit when we want it in - <a href="https://www.amazon.com/SunFounder-Channel-Optocoupler-Expansion-Raspberry/dp/B00E0NTPP4/ref=pd_lpo_vtph_147_lp_t_2?_encoding=UTF8&psc=1&refRID=HKAWHGC30RA17S93497N">amazon.com</a>
                        </li>
                        <li>
                            Raspberry Pi Jumper Cables - these are used to connect the Raspberry Pi to the Relay Module Board so we can communicate with it - <a href="https://www.amazon.com/Aukru-20cm-Breadboard-Arduino-Raspberry/dp/B019SX71TC/ref=sr_1_5?keywords=Female+to+Female+Breadboard+Jumper&qid=1548069482&s=Electronics&sr=1-5">amazon.com</a>
                        </li>
                    </ul>

                    <p>
                        The following image shows you how to wire up your Raspberry Pi to the 2 Channel Relay board using the Jumper cables. I recommend using Red for Positive and Black for Negative just to keep things simple.
                    </p>
                    <img className="mb-2" style={{ width: 100 + '%' }} src={`../${gpioLight}`} />
                    <table className="table w-80 text-center mt-2">
                        <thead>
                            <tr>
                                <th>GPIO Raspberry Pi</th>
                                <th>Relay switch</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>+5V - PIN 2</td>
                                <td>VCC</td>
                            </tr>
                            <tr>
                                <td>GND - PIN 6</td>
                                <td>GND</td>
                            </tr>
                            <tr>
                                <td>GPIO 17 - PIN 11 (can be used any other)</td>
                                <td>IN1</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5>Configure the Smartbian</h5>
                    <p>You can write any script to control the relay switch or you can use the following script. Please make sure if assigned number to the variable <span className="font-weight-bold">GPIOPin</span> is the same as you used to wire up GPIO with relay switch</p>
                    <p>To do this:</p>
                    <ul>
                        <li>go to Control Panel</li>
                        <li>press Editable Off, add bulb and press Save changes</li>
                        <li>press added bulb and press Edit Script</li>
                        <li>copy and paste this script to text area and press Save Changes</li>
                        <li>go to Control Panel</li>
                        <li>press added bulb and press Run Script</li>
                        <li>You should see the text 'Switched on'</li>
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
                    <br />
                </div>
                <br />
            </div>
        );
    }
}

export default WikiLight;
