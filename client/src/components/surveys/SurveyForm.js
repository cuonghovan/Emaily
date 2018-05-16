import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
  {name: 'title', label: 'Survey Title'},
  {name: 'subject', label: 'Subject Line'},
  {name: 'body', label: 'Email Body'},
  {name: 'emails', label: 'Recipient List'}
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
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
