import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        amount={500}
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>
          Add Credits
        </button>
      </StripeCheckout>
    )
  }
}

const mapDispatchToProps = {
  handleStripeToken: actions.handleStripeToken
};

export default connect(null, mapDispatchToProps)(Payments);
