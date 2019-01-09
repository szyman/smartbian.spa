import React, { Component } from 'react';
import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';

class WikiTemperature extends Component {
    componentDidMount() {
        hljs.registerLanguage('python', python);
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
                                {`
import w1thermsensor

sensor = w1thermsensor.W1ThermSensor()
temp = sensor.get_temperature()
print(temp)
                                `}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default WikiTemperature;