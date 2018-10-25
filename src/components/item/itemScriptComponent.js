import React, { Component } from 'react';
import { readScriptItem, saveScriptItem } from '../../actions/itemAction';

class ItemScript extends Component {
    constructor(props) {
        super(props);
        this.state = {
            script: '',
            showSaveButton: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }
    componentDidMount() {
        readScriptItem(this.props.match.params.id).then(({ data }) => {
            this.setState({
                script: data
            })
        });
    }

    render() {
        return (
            <div className="align-self-center text-center">
                <div>Item Script</div>
                <textarea cols='60' rows='8' value={this.state.script} onChange={this.handleChange}></textarea>
                <button className={`btn btn-success btn-block ${this.state.showSaveButton ? 'visible' : 'invisible'}`} onClick={this.saveChanges}>
                    Save Changes
                </button>
            </div>
        );
    }

    handleChange(event) {
        this.setState({
            script: event.target.value,
            showSaveButton: true
        })
    }

    saveChanges() {
        saveScriptItem(this.props.match.params.id, this.state.script).then(() => {
            console.log('Script saved');
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default ItemScript;