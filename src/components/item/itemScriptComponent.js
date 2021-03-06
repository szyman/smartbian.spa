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
            <div className="background-content">
                <div className="container content-background">
                    <div className="align-self-center text-center">
                        <div>Item Script</div>
                        <textarea className="editScriptArea" value={this.state.script} onChange={this.handleChange}></textarea>
                        <button className={`btn btn-success btn-block mx-auto w-50 ${this.state.showSaveButton ? 'visible' : 'invisible'}`} onClick={this.saveChanges}>
                            Save Changes
                        </button>
                        <br />
                    </div>
                </div>
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
            this.setState({
                showSaveButton: false
            });
            console.log('Script saved');
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default ItemScript;