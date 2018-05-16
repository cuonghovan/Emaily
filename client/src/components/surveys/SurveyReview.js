import React from 'react';

const SurveyReview = ({onCancel}) => (
  <div>
    <div>Please confirm your entries!</div>
    <button className='orange btn-flat left white-text' onClick={onCancel}>Back</button>
  </div>
);

export default SurveyReview;
