import React, { Component } from 'react';
import { ItemTextValue } from './itemTextValueComponent';
import { ITEM_TYPE } from './itemComponent';

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.itemTypes = [
            'Horizontal Wall',
            'Vertical Wall',
            'Relly Switcher',
            'Temperature'
        ];
    }
    render() {
        return (
            <div className="items-list d-md-none">
                <ul className="list-group">
                    {this.renderListItems()}
                </ul>
            </div>
        );
    }

    renderListItems() {
        if (_.isEmpty(this.props.itemList)) {
            return;
        }

        return _.map(this.props.itemList, item => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                    {item.title ? item.title : `${this.itemTypes[item.type]} ${item.id}`}
                    {this.renderItemTextValue(item)}
                    <div className="d-flex align-items-right">
                        {item.type === ITEM_TYPE.ELEMENT ?
                            <span className="badge badge-primary badge-pill" onClick={() => this.props.switchItem(item.id)}>Switch</span>
                            : null}
                        <span className="badge badge-primary badge-pill" onClick={() => this.props.toggleModal(item.id, item.type, item.title)}>Show</span>
                    </div>
                </li>
            );
        });
    }

    renderItemTextValue(item) {
        if (item.type === ITEM_TYPE.TEMPERATURE) {
            return (
                <ItemTextValue
                    userId={this.props.userDetails ? this.props.userDetails.id : null}
                    itemId={item.id}
                    itemTitle={item.title} />
            );
        }
        return null;
    }
}

export default ItemList;