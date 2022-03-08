import React from 'react';
import styles from './style.module.css'

const PillButton = (props) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
};

export default PillButton;