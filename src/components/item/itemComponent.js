import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem, updateItem } from '../../actions/itemAction';
import Interact, { RESIZE_HORIZONTAL, RESIZE_VERTICAL } from '../../wrappers/interactWrapper';
import ModalItem from '../modal/modalItemComponent';
import ModalMessage from '../modal/modalMessageComponent';
import { controlPanelExecuteCommand, COMMAND_RUN_SWITCH } from '../../actions/controlPanelAction';

const NOT_SELECTED_ITEM = -1;
export const ITEM_TYPE = {
    HORIZONTAL_WALL: 0,
    VERTICALL_WALL: 1,
    ELEMENT: 2
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ITEM_TYPE.HORIZONTAL_WALL,
            selectedItem: NOT_SELECTED_ITEM,
            showConnectionModal: false,
            message: ''
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.switchItem = this.switchItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    renderItems() {
        if (_.isEmpty(this.props.itemList)) {
            return <div></div>;
        }

        return _.map(this.props.itemList, item => {
            if (item.type === ITEM_TYPE.HORIZONTAL_WALL) {
                return (
                    <Interact key={item.id}
                        itemData={item}
                        classNameItem="drag-wall-horizontal"
                        onTap={() => this.toggleModal(item.id)}
                        resizeConfig={RESIZE_HORIZONTAL}
                        updateItem={(arg) => this.updateItem(item.id, arg)}>
                    </Interact>
                );
            } else if (item.type === ITEM_TYPE.VERTICALL_WALL) {
                return (
                    <Interact key={item.id}
                        itemData={item}
                        classNameItem="drag-wall-vertical"
                        onTap={() => this.toggleModal(item.id)}
                        resizeConfig={RESIZE_VERTICAL}
                        updateItem={(arg) => this.updateItem(item.id, arg)}>
                    </Interact>
                );
            }

            return (
                <Interact key={item.id}
                    itemData={item}
                    classNameItem="drag-element text-center fas fa-lightbulb"
                    onTap={() => this.toggleModal(item.id, ITEM_TYPE.ELEMENT)}
                    updateItem={(arg) => this.updateItem(item.id, arg)}>
                </Interact>
            );
        });
    }

    renderListItems() {
        if (_.isEmpty(this.props.itemList)) {
            return;
        }

        return _.map(this.props.itemList, item => {
            return (
                <li className="list-group-item" key={item.id}>
                    {item.type}
                    <a onClick={() => this.toggleModal(item.id)}>Show</a>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="row mt-2">
                <div className="playground">
                    {this.renderItems()}
                </div>
                <div className="items-list mx-auto">
                    <ul className="list-group">
                        {this.renderListItems()}
                    </ul>
                </div>
                <ModalItem
                    modal={this.state.modal}
                    type={this.state.type}
                    toggleModal={this.toggleModal}
                    removeItem={this.removeItem}
                    switchItem={this.switchItem}>
                </ModalItem>
                <ModalMessage
                    modal={this.state.showConnectionModal}
                    toggle={this.toggleModal}
                    title={"Switching error"}
                    message={this.state.message}>
                </ModalMessage>
            </div>
        );
    }

    toggleModal(id, type) {
        if (!_.isNumber(id)) {
            id = NOT_SELECTED_ITEM;
        }

        this.setState({
            modal: !this.state.modal,
            type: type,
            selectedItem: id,
            showConnectionModal: false,
            message: ''
        });
    }

    removeItem() {
        this.props.removeItem(this.state.selectedItem);
        this.toggleModal(NOT_SELECTED_ITEM);
    }

    switchItem(formValues, connectionValues) {
        const dataConnection = _.assignIn(connectionValues, formValues, {
            commandType: COMMAND_RUN_SWITCH,
            itemId: this.state.selectedItem
        });
        this.props.controlPanelExecuteCommand(dataConnection).then(() => {
            this.toggleModal(NOT_SELECTED_ITEM);
        }).catch((error) => {
            this.setState({
                showConnectionModal: true,
                message: error
            });
        });
    }

    updateItem(id, { target }) {
        const dataToUpdate = {
            id: id,
            dataX: parseInt(target.dataset.x),
            dataY: parseInt(target.dataset.y),
            width: target.style.cssText
        }

        this.props.updateItem(dataToUpdate);
    }
}

function mapStateToProps({ itemList }) {
    return { itemList };
}

export default connect(mapStateToProps, { removeItem, updateItem, controlPanelExecuteCommand })(Item);