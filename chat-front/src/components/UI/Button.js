import React from 'react';

const Button = ({text, callBack, className, type}) => {
    return (
        <button className={className} onClick={callBack} type={type}>{text}</button>
    );
};

export default Button;
