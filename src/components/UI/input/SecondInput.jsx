import React from 'react';
import classes from './SecondInput.module.css'

const SecondInput = React.forwardRef((props, ref) => {
    return (
        <input {...props} ref={ref}
               className={classes.secondInput}/>
)
    ;
});

export default SecondInput;