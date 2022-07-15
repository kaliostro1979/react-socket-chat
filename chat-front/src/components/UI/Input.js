import React from 'react';

const Input = ({value, onChange, callBack, type, id, name, placeholder, disabled, className}) => {

    return (
        <input
            type={type}
            name={name}
            className={className ? className : ""}
            id={id}
            onChange={(e) => type === "file" ? onChange(e.target.files[0]) : onChange(e.target.value)}
            onKeyDown={callBack ? (e)=> e.key === 'Enter' && callBack() : null}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={"off"}
        />
    );
};

export default Input;
