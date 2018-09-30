import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import { addItem } from '../../actions/itemAction';
import ItemHorizontal from './itemHorizontalComponent';

class Item extends Component {

    addItem(type) {
        this.props.addItem(type);
        console.log(type);
    }

    render() {
        return (
            <div>
                <Button color="secondary" onClick={() => this.addItem(0)}>Horizontal</Button><br />
                <Button color="secondary" className="mt-1">Vertical</Button><br />
                <Button color="warning" className="mt-1">
                    <i className="fas fa-lightbulb"></i>
                </Button><br />
                <ItemHorizontal></ItemHorizontal>
            </div>
        );
    }
}

export default connect(null, { addItem })(Item);