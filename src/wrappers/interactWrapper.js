import React, { Component } from 'react';
import interact from 'interactjs';

export const RESIZE_HORIZONTAL = 0;
export const RESIZE_VERTICAL = 1;

class Interact extends Component {
    shouldComponentUpdate() {
        return false;
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
                onmove: dragMoveListener
            })
            .on('resizemove', resizemove)
            .on('tap', this.props.onTap)
            .on(['dragend', 'resizeend'], this.props.updateItem)
            .resizable(this.resizeConfig());
    }

    render() {
        return (
            <div className={`drag-1 ${this.props.classNameItem}`} ref="draggable"></div>
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
}

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function resizemove(event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

export default Interact;