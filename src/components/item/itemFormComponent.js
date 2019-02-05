import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ItemForm extends Component {
    renderField(field) {
        return (
            <div>
                <input
                    className="form-control"
                    type={field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} onChange={this.props.handleChange}>
                <h4>Title:</h4>
                <Field
                    type="text"
                    placeholder="title"
                    name="title"
                    component={this.renderField}
                />
                <button className={`btn btn-success btn-block mt-2 mx-auto w-50 ${this.props.showSaveButton ? 'visible' : 'invisible'}`} type="submit">Submit</button>
                <br />
            </form>
        );
    }
}

export default reduxForm({
    form: 'ItemForm'
})(ItemForm);
