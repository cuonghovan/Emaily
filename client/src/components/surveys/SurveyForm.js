import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields() {
    return (
      <div>
        {formFields.map(({name, label}) => <Field key={name} type='text' name={name} label={label} component={SurveyField} />)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmitSurvey)}>
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat left white-text'>
            Cancel
          </Link>
          <button type='submit' className='teal btn-flat right white-text'>
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  let errors = {};

  // validate emails
  errors.recipients = validateEmail(values.recipients || '');

  // require values
  formFields.forEach(({name, message}) => {
    if (!values[name]) {
      errors[name] = message.noValue;
    }
  });


  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
