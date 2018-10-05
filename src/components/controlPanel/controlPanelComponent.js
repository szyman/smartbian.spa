import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { addItem } from '../../actions/itemAction';
import Item from '../item/itemComponent';
import ModalConnection from '../modal/modalConnectionComponent';

class ControlPanel extends Component {



    addItem(type) {
        this.props.addItem(type);
    }

    render() {
        return (
            <div>
                <div className="row mb-1">
                    <ModalConnection />
                </div>
                <div className="row mb-5">
                    <Button color="secondary" className="mr-1" onClick={() => this.addItem(0)}>Horizontal</Button>
                    <Button color="secondary" className="mr-1" onClick={() => this.addItem(1)}>Vertical</Button>
                    <Button color="warning" className="mr-1" onClick={() => this.addItem(2)}>
                        <i className="fas fa-lightbulb"></i>
                    </Button><br />
                </div>
                <div className="playground">
                    <Item></Item>
                </div>
            </div>
        );
    }
}

export default connect(null, { addItem })(ControlPanel);