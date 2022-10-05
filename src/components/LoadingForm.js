import React, { Component } from 'react';
import styles from './loadingForm.module.scss';
import loadingIcon from '../images/loading-icon.gif';

class LoadingForm extends Component {
  render() {
    return (
      <div className={ styles.loading }>
        <div data-testid="fetching" className={ styles.loading_form }>
          Loading...
          <img src={ loadingIcon } alt="loading gif" />
        </div>
        <div className={ styles.loading_button }>
          Loading...
          <img src={ loadingIcon } alt="loading gif" />
        </div>
      </div>
    );
  }
}

export default LoadingForm;
