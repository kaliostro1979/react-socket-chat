import React from 'react';

const Button = ({text, callBack, className, type, disabled}) => {
    return (
        <button className={className} onClick={callBack} type={type} disabled={disabled}>{text}</button>
    );
};

export default Button;
