import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmail';

const FIELDS = [
  {name: 'title', label: 'Survey Title', message: {noValue: 'You must provide title'}},
  {name: 'subject', label: 'Subject Line', message: {noValue: 'You must provide subject'}},
  {name: 'body', label: 'Email Body', message: {noValue: 'You must provide email body'}},
  {name: 'emails', label: 'Recipient List', message: {noValue: 'You must provide recipient emails'}}
];

class SurveyForm extends React.Component {
  renderFields() {
    return (
      <div>
        {FIELDS.map(({name, label}) => <Field key={name} type='text' name={name} label={label} component={SurveyField} />)}
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
  errors.emails = validateEmail(values.emails || '');

  // require values
  FIELDS.forEach(({name, message}) => {
    if (!values[name]) {
      errors[name] = message.noValue;
    }
  });


  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm'
})(SurveyForm);
