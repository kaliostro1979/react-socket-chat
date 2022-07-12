import React from 'react';

const Input = ({value, onChange, callBack, type, id, name}) => {
    return (
        <input
            type={type}
            name=""
            id={id}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={callBack ? (e)=> e.key === 'Enter' && callBack() : null}
            value={value}
        />
    );
};

export default Input;
