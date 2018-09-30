import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { removeItem } from '../../actions/itemAction';

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
                <Button key={item.id} color="secondary" onClick={() => this.removeItem(item.id)}>Horizontal</Button>
            );
        });
    }

    render() {
        return (
            <div>
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