import React from 'react';
import styles from './style.module.css'

const Button = (props) => {
  return (
    <button {...props} className={styles.default_button}>
      {props.children}
    </button>
  );
};

export default Button;