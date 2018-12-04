import React, { Component } from 'react';
import interact from 'interactjs';

export const RESIZE_HORIZONTAL = 0;
export const RESIZE_VERTICAL = 1;

class Interact extends Component {
    constructor(props) {
        super(props);

        this.dragMoveListener = this.dragMoveListener.bind(this);
        this.resizemove = this.resizemove.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        this.refs.draggable.setAttribute('data-x', this.props.itemData.dataX);
        this.refs.draggable.setAttribute('data-y', this.props.itemData.dataY);
        this.refs.draggable.setAttribute('style', this.props.itemData.style);

        interact(this.refs.draggable)
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: ".playground",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: this.dragMoveListener
            })
            .on('resizemove', this.resizemove)
            .on('tap', this.props.onTap)
            .on(['dragend', 'resizeend'], this.props.updateItem)
            .resizable(this.resizeConfig());
    }

    render() {
        return (
            <div className={`drag-1 ${this.props.classNameItem}`} ref="draggable">
                <i className={this.props.classNameIcon}></i>
                {this.props.children}
            </div>
        );
    }

    resizeConfig() {
        if (this.props.resizeConfig === RESIZE_HORIZONTAL) {
            return {
                preserveAspectRatio: false,
                edges: {
                    left: true,
                    right: true,
                    bottom: false,
                    top: false
                }
            }
        } else if (this.props.resizeConfig === RESIZE_VERTICAL) {
            return {
                preserveAspectRatio: false,
                edges: {
                    left: false,
                    right: false,
                    bottom: true,
                    top: true
                }
            }
        }
    }

    dragMoveListener(event) {
        if (!this.props.isEditable) {
            return;
        }

        var playgroundSize = event.target.parentElement.getBoundingClientRect();
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + this._getScaledSize(playgroundSize, event.dx),
            y = (parseFloat(target.getAttribute('data-y')) || 0) + this._getScaledSize(playgroundSize, event.dy);

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    resizemove(event) {
        if (!this.props.isEditable) {
            return;
        }

        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        var playgroundSize = event.target.parentElement.getBoundingClientRect();

        // update the element's style
        if (event.deltaRect.width) {
            target.style.width = this._getScaledSize(playgroundSize, event.rect.width) + 'px';
        }
        if (event.deltaRect.height) {
            target.style.height = this._getScaledSize(playgroundSize, event.rect.height) + 'px';
        }

        // translate when resizing from top or left edges
        x += this._getScaledSize(playgroundSize, event.deltaRect.left);
        y += this._getScaledSize(playgroundSize, event.deltaRect.top);

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    _getScaledSize(playgroundSize, sizeToScale) {
        if (playgroundSize.width < 700) {
            return sizeToScale + sizeToScale * 0.25;
        }

        return sizeToScale;
    }
}

export default Interact;