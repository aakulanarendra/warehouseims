import {Field, reduxForm} from 'redux-form';
import asyncValidate from "../validate/asyncValidate";
import validateProduct from "../validate/validateProduct";
import {renderTextField} from "./FormFields";
import React from "react";


let FormCode = props => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <form onSubmit={ handleSubmit }>
            <div className="form-group">
                <Field name="firstName" component={renderTextField} label="First Name" />
            </div>
            <div className="form-group">
                <Field name="lastName" component={renderTextField} label="Last Name" />
            </div>
            <div className="form-group">
                <Field name="email" component={renderTextField} label="Email" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}
FormCode = reduxForm({
    form: 'basic',
    validateProduct,
    asyncValidate,
})(FormCode);

export default FormCode;