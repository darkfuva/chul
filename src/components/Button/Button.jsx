import React from 'react';
import styles from './button.module.css';



const Button = ({ label, buttonstyle, disabled, handleBtnClick }) => {
  return (
    <button
      className={
        buttonstyle === 'orangeBtn' ? styles.orangeBtn : styles.whiteBtn
      }
      onClick={handleBtnClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
