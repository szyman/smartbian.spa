import React, { Component } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { controlPanelExecuteCommand, controlPanelGetVideoLink, VIDEO_STREAMING, VIDEO_STATUS, VIDEO_STOP } from '../../actions/controlPanelAction';

class ItemStreamShow extends Component {
    flvPlayer = null;

    constructor(props) {
        super(props)

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.controlPanelExecuteCommand(VIDEO_STATUS, this.props.userAuth.id, this.props.match.params.id, false).then(({ payload }) => {
            if (!payload.data) {
                this.props.controlPanelExecuteCommand(VIDEO_STREAMING, this.props.userAuth.id, this.props.match.params.id, false);
            }
        });

        if (flv.isSupported()) {
            this.props.controlPanelGetVideoLink(this.props.userAuth.id, this.props.match.params.id).then(({ payload }) => {
                this.flvPlayer = flv.createPlayer({
                    type: 'flv',
                    cors: true,
                    url: payload.data
                });
                this.flvPlayer.attachMediaElement(this.videoRef.current);
                this.flvPlayer.load();
                this.flvPlayer.play();
            });
        }
    }

    componentWillUnmount() {
        this.props.controlPanelExecuteCommand(VIDEO_STOP, this.props.userAuth.id, this.props.match.params.id, false);
        this.flvPlayer.destroy();
    }

    render() {
        return (<video ref={this.videoRef} style={{ width: '100%' }} controls>
        </video>);
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps, { controlPanelExecuteCommand, controlPanelGetVideoLink })(ItemStreamShow);
