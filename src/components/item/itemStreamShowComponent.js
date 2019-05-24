import React, { Component } from 'react';
import flv from 'flv.js'

class ItemStreamShow extends Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        if (flv.isSupported()) {
            var flvPlayer = flv.createPlayer({
                type: 'flv',
                url: 'http://localhost:8000/live/stream.flv',

            });
            flvPlayer.attachMediaElement(this.videoRef.current);
            flvPlayer.load();
        }
    }

    render() {
        return (<video ref={this.videoRef} style={{ width: '100%' }} controls>
        </video>);
    }
}

export default ItemStreamShow;
