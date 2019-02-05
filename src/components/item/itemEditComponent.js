import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemForm from './itemFormComponent';
import { getItems, saveItem } from '../../actions/itemAction';

class ItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSaveButton: false
        };
        this.updateItem = this.updateItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <div className="align-self-center text-center mb-2">
                        <h1>Edit Item</h1>
                        <ItemForm
                            initialValues={_.pick(this.props.itemDetails, 'title', 'scriptFileName')}
                            onSubmit={this.updateItem}
                            handleChange={this.handleChange}
                            showSaveButton={this.state.showSaveButton}
                        />
                    </div>
                </div>
            </div>
        );
    }

    updateItem(values) {
        this.props.saveItem(this.props.match.params.id, values).then(() => {
            this.setState({ showSaveButton: false });
        });
    }

    handleChange() {
        this.setState({ showSaveButton: true });
    }
}

function mapStateToProps({ itemList }, ownProps) {
    return { itemDetails: itemList[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { getItems, saveItem })(ItemEdit)
