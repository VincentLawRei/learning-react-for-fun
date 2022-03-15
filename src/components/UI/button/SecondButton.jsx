import React from 'react';
import classes from './SecondButton.module.css'

const SecondButton = ({ children, ...props }) => {
    return (
        <button className={classes.secondButton} {...props}>
            {children}
        </button>
    );
};

export default SecondButton;