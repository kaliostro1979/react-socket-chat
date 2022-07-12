import React from 'react';

const Title = ({title, className}) => {
    return (
        <div className={className}>
            <h1>{title}</h1>
        </div>
    );
};

export default Title;
