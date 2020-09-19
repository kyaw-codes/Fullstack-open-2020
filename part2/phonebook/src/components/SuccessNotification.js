import React from 'react'

const SuccessNotification = ({message, type}) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return message ? <div style={successStyle}>{message}</div> : null;
}


export default SuccessNotification;