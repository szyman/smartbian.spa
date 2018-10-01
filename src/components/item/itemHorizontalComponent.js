import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem } from '../../actions/itemAction';
import Interact from '../../wrappers/interactWrapper';

class ItemHorizontal extends Component {
    constructor(props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
    }

    renderItems() {
        if (_.isEmpty(this.props.itemList)) {
            return <div></div>;
        }

        return _.map(this.props.itemList, item => {
            return (
                <Interact key={item.id} className="drag-1" onTap={() => this.removeItem(item.id)}></Interact>
            );
        });
    }

    render() {
        return (
            <div className="playground">
                {this.renderItems()}
            </div>
        )
    }

    removeItem(id) {
        this.props.removeItem(id);
    }
}

function mapStateToProps({ itemList }) {
    return { itemList };
}

export default connect(mapStateToProps, { removeItem })(ItemHorizontal);