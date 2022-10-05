import React, { Component } from 'react';
import styles from './loadingForm.module.scss';

class LoadingForm extends Component {
  render() {
    return (
      <div className={ styles.loading }>
        <div data-testid="fetching" className={ styles.loading_form }>
          Loading...
        </div>
        <div className={ styles.loading_button }>Loading...</div>
      </div>
    );
  }
}

export default LoadingForm;
