import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { getItems, saveItem } from '../../actions/itemAction';

class ItemEdit extends Component {
    constructor(props) {
        super(props);

        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        this.props.getItems(this.props.userAuth.id);
    }

    render() {
        const { handleSubmit, initialValues } = this.props;
        if (!this.props.initialValues) {
            return <div></div>;
        } else {
            return (
                <div className="background-content">
                    <div className="container content-background">
                        <div className="align-self-center text-center mb-2">
                            <h1>Edit Item</h1>
                            <form onSubmit={handleSubmit(this.updateItem)}>
                                <div>
                                    <h4>Title: {initialValues.title}</h4>
                                    <Field className="form-control" name="title" component="input" type="text" />
                                </div>
                                <div>
                                    <h4>Gpio: {initialValues.gpio}</h4>
                                    <Field className="form-control" name="gpio" component="input" type="number" />
                                </div>
                                <div>
                                    <h4>Script file name: {initialValues.scriptFileName}</h4>
                                    <Field className="form-control" name="scriptFileName" component="input" type="text" />
                                </div>
                                <button className="btn btn-success btn-block mt-2 mx-auto w-50" type="submit">Submit</button>
                                <br/>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }

    updateItem(values) {
        var itemValues = this.props.initialValues;
        _.assignIn(itemValues, values);

        this.props.saveItem(this.props.match.params.id, itemValues);
    }
}

function mapStateToProps({ itemList, userAuth }, ownProps) {
    var values;
    var item = itemList[ownProps.match.params.id];
    if (item) {
        values = {
            title: item.title,
            gpio: item.gpio,
            scriptFileName: item.scriptFileName
        }
    }
    return { initialValues: values, userAuth }
}

export default reduxForm({
    form: 'UserEditForm',
    enableReinitialize: true
})(connect(mapStateToProps, { getItems, saveItem })(ItemEdit))