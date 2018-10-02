import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem } from '../../actions/itemAction';
import Interact from '../../wrappers/interactWrapper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NOT_SELECTED_ITEM = -1;

class ItemHorizontal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedItem: NOT_SELECTED_ITEM
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    renderItems() {
        if (_.isEmpty(this.props.itemList)) {
            return <div></div>;
        }

        return _.map(this.props.itemList, item => {
            return (
                <Interact key={item.id} className="drag-1" onTap={() => this.toggleModal(item.id)}></Interact>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderItems()}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Button className="w-100" color="primary" onClick={this.removeItem}>Remove</Button><br />
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-100" color="secondary" onClick={this.toggleModal}>Cancel</Button><br />
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    toggleModal(id) {
        if (!_.isNumber(id)) {
            id = NOT_SELECTED_ITEM;
        }

        this.setState({
            modal: !this.state.modal,
            selectedItem: id
        });
    }

    removeItem() {
        this.props.removeItem(this.state.selectedItem);
        this.toggleModal(NOT_SELECTED_ITEM);
    }
}

function mapStateToProps({ itemList }) {
    return { itemList };
}

export default connect(mapStateToProps, { removeItem })(ItemHorizontal);