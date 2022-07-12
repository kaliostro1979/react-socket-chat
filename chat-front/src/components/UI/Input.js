import React from 'react';

const Input = ({value, onChange, callBack, type, id, name, placeholder}) => {
    return (
        <input
            type={type}
            name={name}
            id={id}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={callBack ? (e)=> e.key === 'Enter' && callBack() : null}
            value={value}
            placeholder={placeholder}
        />
    );
};

export default Input;
