import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { removeItem, updateItem, getItems, saveItems, saveNewItems } from '../../actions/itemAction';
import Interact, { RESIZE_HORIZONTAL, RESIZE_VERTICAL } from '../../wrappers/interactWrapper';
import ModalItem from '../modal/modalItemComponent';
import ModalMessage from '../modal/modalMessageComponent';
import ItemTextValue from './itemTextValueComponent';
import { controlPanelExecuteCommand, COMMAND_RUN_SWITCH } from '../../actions/controlPanelAction';
import { userGetDetails } from '../../actions/userAction';
import ItemList from './itemListComponent';

const NOT_SELECTED_ITEM = -1;
export const ITEM_TYPE = {
    HORIZONTAL_WALL: 0,
    VERTICALL_WALL: 1,
    ELEMENT: 2,
    TEMPERATURE: 3
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ITEM_TYPE.HORIZONTAL_WALL,
            selectedItem: NOT_SELECTED_ITEM,
            showConnectionModal: false,
            message: '',
            showSaveButton: false,
            textItem: '--'
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.switchItem = this.switchItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {
        this.props.getItems(this.props.userAuth.id);
        this.props.userGetDetails(this.props.userAuth.id);
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
                        updateItem={(arg) => this.updateItem(item.id, arg)}
                        isEditable={this.props.isEditable}>
                    </Interact>
                );
            } else if (item.type === ITEM_TYPE.VERTICALL_WALL) {
                return (
                    <Interact key={item.id}
                        itemData={item}
                        classNameItem="drag-wall-vertical"
                        onTap={() => this.toggleModal(item.id)}
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
                        onTap={() => this.toggleModal(item.id, ITEM_TYPE.ELEMENT)}
                        updateItem={(arg) => this.updateItem(item.id, arg)}
                        isEditable={this.props.isEditable}>
                        <ItemTextValue
                            ip={this.props.userDetails ? this.props.userDetails.raspHost : null}
                            socketPort={item.socketPort}/>
                    </Interact>
                )
            }

            return (
                <Interact key={item.id}
                    itemData={item}
                    classNameItem="drag-element"
                    classNameIcon="fas fa-lightbulb fa-2x"
                    onTap={() => this.toggleModal(item.id, ITEM_TYPE.ELEMENT)}
                    updateItem={(arg) => this.updateItem(item.id, arg)}
                    isEditable={this.props.isEditable}>
                </Interact>
            );
        });
    }

    render() {
        return (
            <div>
                <div className={`mb-2 ml-2 ${this.state.showSaveButton && this.props.isEditable ? 'visible' : 'invisible'}`}>
                    <Button color="primary" className="mt-1" onClick={this.saveChanges}>Save changes</Button>
                </div>
                <div className="playground">
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
        this.setState({
            showSaveButton: true
        });
    }

    saveChanges() {
        const filteredExistItems = _.filter(this.props.itemList, ((i) => i.id >= 0));
        const filteredNewItems = _.filter(this.props.itemList, ((i) => i.id < 0));

        if (filteredExistItems.length > 0) {
            this.props.saveItems(this.props.userAuth.id, filteredExistItems).then(() => {
                this.setState({
                    showSaveButton: false
                });
            }).catch((error) => {
                this.setState({
                    showConnectionModal: true,
                    message: error
                })
            });
        }

        if (filteredNewItems.length > 0) {
            this.props.saveNewItems(this.props.userAuth.id, filteredNewItems).then(() => {
                this.setState({
                    showSaveButton: false
                });
            }).catch((error) => {
                this.setState({
                    showConnectionModal: true,
                    message: error
                })
            });
        }
    }
}

function mapStateToProps({ itemList, userAuth, userList }) {
    return { itemList, userAuth, userDetails: userList[userAuth.id] };
}

export default connect(mapStateToProps, { removeItem, updateItem, getItems, saveItems, saveNewItems, controlPanelExecuteCommand, userGetDetails })(Item);