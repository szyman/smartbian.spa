import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { getItem, saveItem } from '../../actions/itemAction';

class ItemEdit extends Component {
    constructor(props) {
        super(props);

        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        this.props.getItem(this.props.match.params.id);
    }

    render() {
        const { handleSubmit } = this.props;
        if (!this.props.item) {
            return <div></div>;
        } else {
            return (
                <div className="align-self-center text-center mb-2">
                    <h1>Edit Item</h1>
                    <form onSubmit={handleSubmit(this.updateItem)}>
                        <div>
                            <h4>Title: {this.props.item.title}</h4>
                            <Field className="form-control" name="title" component="input" type="text" />
                        </div>
                        <div>
                            <h4>Gpio: {this.props.item.gpio}</h4>
                            <Field className="form-control" name="gpio" component="input" type="text" />
                        </div>
                        <div>
                            <h4>Script file name: {this.props.item.scriptFileName}</h4>
                            <Field className="form-control" name="scriptFileName" component="input" type="text" />
                        </div>
                        <button className="btn btn-success btn-block mt-2" type="submit">Submit</button>
                    </form>
                </div>
            );
        }
    }

    updateItem(values) {
        for (var value in values) {
            if (!values[value]) {
                values[value] = this.props.item[value];
            }
        }
        this.props.saveItem(this.props.match.params.id, values);
    }
}

function mapStateToProps({ itemList }, ownProps) {
    return { item: itemList[ownProps.match.params.id] }
}

export default reduxForm({
    form: 'UserEditForm',
    initialValues: {
        gpio: "",
        scriptFileName: "",
        title: ""
    }
})(connect(mapStateToProps, { getItem, saveItem })(ItemEdit))