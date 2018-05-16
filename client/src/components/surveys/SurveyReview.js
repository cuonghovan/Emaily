import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyReview = ({onCancel, formValues, submitSurvey}) => {
  const reviewFields = formFields.map(({name, label}) => 
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  );

  return (
    <div>
      <div>Please confirm your entries!</div>
      {reviewFields}
      <button className='orange btn-flat left white-text' onClick={onCancel}>Back</button>
      <button className='green btn-flat right white-text'
        onClick={() => submitSurvey(formValues)}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  )
};

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
});

const mapDispatchToProps = {
  submitSurvey: actions.submitSurvey
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyReview);
