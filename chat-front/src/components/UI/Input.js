import React from 'react';

const Input = ({value, onChange, callBack, type, id, name, placeholder, disabled, className, onBlur, onFocus}) => {

    return (
        <input
            type={type}
            name={name}
            className={className ? className : ""}
            id={id}
            onChange={(e) => type === "file" ? onChange(e.target.files[0]) : onChange(e)}
            onKeyDown={(e)=> callBack ? callBack(e) : null}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={"off"}
            onBlur={onBlur && onBlur}
            onFocus={onFocus && onFocus}
        />
    );
};

export default Input;
