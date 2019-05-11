import React, { Component } from 'react';
import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';

class WikiMontion extends Component {
    componentDidMount() {
        hljs.registerLanguage('python', python);
        hljs.highlightBlock(this.refs.highlight);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">Motion sensor</h3>
                    <div ref="highlight">
                        <pre>
                            <code>
                                {`
import RPi.GPIO as GPIO

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.IN)         #Read output from PIR motion sensor

i=GPIO.input(12)
if i==0:                 #When output from motion sensor is LOW
   print('NO')
elif i==1:               #When output from motion sensor is HIGH
   print('YES')

                                `}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default WikiMontion;
