import React from 'react';

const Button = ({text, callBack, className}) => {
    return (
        <button className={className} onClick={callBack}>{text}</button>
    );
};

export default Button;
