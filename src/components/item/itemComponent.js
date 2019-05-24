import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem, updateItem } from '../../actions/itemAction';
import Interact, { RESIZE_HORIZONTAL, RESIZE_VERTICAL } from '../../wrappers/interactWrapper';
import ModalItem from '../modal/modalItemComponent';
import ModalMessage from '../modal/modalMessageComponent';
import ItemTextValue from './itemTextValueComponent';
import { controlPanelExecuteCommand, COMMAND_RUN_SWITCH } from '../../actions/controlPanelAction';
import { userGetDetails } from '../../actions/userAction';
import ItemList from './itemListComponent';

const NOT_SELECTED_ITEM = null;
export const ITEM_TYPE = {
    HORIZONTAL_WALL: 0,
    VERTICALL_WALL: 1,
    ELEMENT: 2,
    TEMPERATURE: 3,
    CAMERA: 4
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ITEM_TYPE.HORIZONTAL_WALL,
            selectedItem: NOT_SELECTED_ITEM,
            itemTitle: '',
            showConnectionModal: false,
            message: '',
            textItem: '--'
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.switchItem = this.switchItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        this.props.userGetDetails(this.props.userAuth.id);
    }

    renderItems() {
        return _.map(this.props.itemList, item => {
            if (item.type === ITEM_TYPE.HORIZONTAL_WALL) {
                return (
                    <Interact key={item.id}
                        itemData={item}
                        classNameItem="drag-wall-horizontal"
                        onTap={() => this.toggleModal(item.id, ITEM_TYPE.HORIZONTAL_WALL, item.title)}
                        resizeConfig={RESIZE_HORIZONTAL}
                        updateItem={(arg) => this.updateItem(item.id, arg)}
                        isEditable={this.props.isEditable}>
                    </Interact>
                );
            } else if (item.type === ITEM_TYPE.VERTICALL_WALL) {
                return (
                    <Interact key={item.id}
                        itemData={item}
                        classNameItem="drag-wall-vertical"
                        onTap={() => this.toggleModal(item.id, ITEM_TYPE.VERTICALL_WALL, item.title)}
                        resizeConfig={RESIZE_VERTICAL}
                        updateItem={(arg) => this.updateItem(item.id, arg)}
                        isEditable={this.props.isEditable}>
                    </Interact>
                );
            } else if (item.type === ITEM_TYPE.TEMPERATURE) {
                return (
                    <Interact key={item.id}
                        itemData={item}
                        classNameItem="drag-element"
                        onTap={() => this.toggleModal(item.id, ITEM_TYPE.ELEMENT, item.title)}
                        updateItem={(arg) => this.updateItem(item.id, arg)}
                        isEditable={this.props.isEditable}>
                        <ItemTextValue
                            userId={this.props.userAuth.id}
                            itemId={item.id} />
                    </Interact>
                )
            } else if (item.type === ITEM_TYPE.CAMERA) {
                return (
                    <Interact key={item.id}
                        itemData={item}
                        classNameItem="drag-element"
                        classNameIcon="fas fa-video fa-2x"
                        onTap={() => this.toggleModal(item.id, ITEM_TYPE.CAMERA, item.title)}
                        updateItem={(arg) => this.updateItem(item.id, arg)}
                        isEditable={this.props.isEditable}>
                    </Interact>
                )
            }

            return (
                <Interact key={item.id}
                    itemData={item}
                    classNameItem="drag-element"
                    classNameIcon="fas fa-lightbulb fa-2x"
                    onTap={() => this.toggleModal(item.id, ITEM_TYPE.ELEMENT, item.title)}
                    updateItem={(arg) => this.updateItem(item.id, arg)}
                    isEditable={this.props.isEditable}>
                </Interact>
            );
        });
    }

    render() {
        return (
            <div className="mt-2">
                <div className="playground d-md-block">
                    {this.renderItems()}
                </div>
                <ItemList
                    itemList={this.props.itemList}
                    userDetails={this.props.userDetails}
                    toggleModal={this.toggleModal}>
                </ItemList>
                <ModalItem
                    itemId={this.state.selectedItem}
                    modal={this.state.modal}
                    type={this.state.type}
                    itemTitle={this.state.itemTitle}
                    toggleModal={this.toggleModal}
                    removeItem={this.removeItem}
                    switchItem={this.switchItem}>
                </ModalItem>
                <ModalMessage
                    modal={this.state.showConnectionModal}
                    toggle={this.toggleModal}
                    title={"Item message"}
                    message={this.state.message}>
                </ModalMessage>
            </div>
        );
    }

    toggleModal(id, type, title) {
        if (!_.isNumber(id)) {
            id = NOT_SELECTED_ITEM;
        }

        this.setState({
            modal: !this.state.modal,
            type: type,
            itemTitle: title,
            selectedItem: id,
            showConnectionModal: false,
            message: ''
        });
    }

    removeItem() {
        if (this.state.selectedItem >= 0) {
            this.props.removeItem(this.state.selectedItem).then(() => {
                this.toggleModal(NOT_SELECTED_ITEM);
            });
        } else {
            this.props.removeItem(this.state.selectedItem);
            this.toggleModal(NOT_SELECTED_ITEM);
        }
    }

    switchItem() {
        this.props.controlPanelExecuteCommand(COMMAND_RUN_SWITCH, this.props.userAuth.id, this.state.selectedItem).then(({ payload }) => {
            //this.toggleModal(NOT_SELECTED_ITEM);
            if (!payload.data) {
                return;
            }
            this.setState({
                showConnectionModal: true,
                message: payload.data
            });
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
            style: target.style.cssText
        }

        this.props.updateItem(dataToUpdate);
        this.props.showSaveButton(true);
    }
}

function mapStateToProps({ userAuth, userList }) {
    return { userAuth, userDetails: userList[userAuth.id] };
}

export default connect(mapStateToProps, { removeItem, updateItem, controlPanelExecuteCommand, userGetDetails })(Item);