import React, { Component } from 'react';
import flv from 'flv.js'
import { connect } from 'react-redux';
import { controlPanelExecuteCommand, VIDEO_STREAMING } from '../../actions/controlPanelAction';

class ItemStreamShow extends Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.controlPanelExecuteCommand(VIDEO_STREAMING, this.props.userAuth.id);
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

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps, { controlPanelExecuteCommand })(ItemStreamShow);
