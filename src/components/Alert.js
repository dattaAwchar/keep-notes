import React from 'react';

const Alert = (props) => {

    const renderIcon = (type) => {
        if (type === 'danger') {
            return <i style={{ marginLeft: '1rem', display:'flex' }} className="bi bi-x-circle-fill me-2"></i>;
        } else {
            return <i style={{ marginLeft: '1rem' }} className="fa-solid fa-circle-check me-2"></i>;
        }
    };

    // const capitalize = (word) => {
    //     if (!word) return '';
    //     const lower = word.toLowerCase();
    //     return lower.charAt(0).toUpperCase() + lower.slice(1);
    // };

    return (
        <>
            <div style={{ height: '5rem' }}>
                {props.alert && (
                    <div
                        style={{ height: '2.5rem' }}
                        className={`alert alert-${props.alert.type} d-flex align-items-center`}
                        role="alert">
                        
                        <strong style={{ marginLeft: '.5rem'}}>{renderIcon(props.alert.type)}</strong>{props.alert.msg}
                    </div>
                )}
            </div>
        </>
    );
};

export default Alert;
